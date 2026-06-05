/* ============================================================
   WireframeTerrain — animated low-poly wireframe terrain on a
   2D canvas. Scrolls toward the viewer, reacts to mouse for a
   subtle parallax/yaw, glows in the accent colour. Honours
   prefers-reduced-motion (renders a single static frame).
   ============================================================ */

function WireframeTerrain({ density = 1, animate = true }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let raf, w, h, dpr;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // grid config
    const COLS = Math.round(46 * density);
    const ROWS = Math.round(30 * density);
    const SPACING = 1.0;
    const AMP = 1.7;

    function readAccent() {
      const c = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
      return c || "#c574f7";
    }
    let accent = readAccent();

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.parentElement.getBoundingClientRect();
      w = r.width; h = r.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      accent = readAccent();
    }
    resize();
    window.addEventListener("resize", resize);

    // value-noise terrain height
    function hash(x, y) {
      let n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
      return n - Math.floor(n);
    }
    function smooth(t) { return t * t * (3 - 2 * t); }
    function noise(x, y) {
      const xi = Math.floor(x), yi = Math.floor(y);
      const xf = x - xi, yf = y - yi;
      const tl = hash(xi, yi), tr = hash(xi + 1, yi);
      const bl = hash(xi, yi + 1), br = hash(xi + 1, yi + 1);
      const u = smooth(xf), v = smooth(yf);
      return (tl * (1 - u) + tr * u) * (1 - v) + (bl * (1 - u) + br * u) * v;
    }
    function terrainHeight(x, z) {
      let n = noise(x * 0.18, z * 0.18) * 1.0;
      n += noise(x * 0.42, z * 0.42) * 0.42;
      n += noise(x * 0.9, z * 0.9) * 0.16;
      // carve a calmer valley toward the centre columns
      const centre = Math.abs(x) / (COLS * 0.5);
      n *= 0.45 + centre * 0.7;
      return (n - 0.5) * AMP;
    }

    const CAM_Y = 2.4;     // camera height above the terrain base plane
    const NEAR0 = 1.0;     // depth of the nearest row

    let t0 = performance.now();
    function frame(now) {
      const t = (now - t0) / 1000;

      ctx.clearRect(0, 0, w, h);

      const scroll = animate && !reduce ? t * 1.0 : 0;
      const frac = scroll - Math.floor(scroll);

      const cx = w * 0.5;
      const horizonY = h * 0.30;
      const f = h * 0.5;                  // focal * screen scale
      const panX = 0;

      function project(x, y, d) {
        if (d < 0.55) return null;
        const px = cx + (x / d) * f + panX;
        const py = horizonY + ((CAM_Y - y) / d) * f;
        return { px, py, d };
      }

      // precompute projected points — field flies toward the camera
      const pts = [];
      for (let j = 0; j < ROWS; j++) {
        const row = [];
        const d = (j - frac) * SPACING + NEAR0;     // depth recycles each unit of scroll
        const worldZ = j + Math.floor(scroll);      // integer-step sample keeps recycle seamless
        for (let i = 0; i < COLS; i++) {
          const xCol = i - COLS / 2;
          const y = terrainHeight(xCol, worldZ);
          const p = project(xCol * SPACING, y, d);
          if (p) p.y = y;
          row.push(p);
        }
        pts.push(row);
      }

      // draw in depth tiers (far -> near) so glow batches efficiently
      const TIERS = 7;
      for (let tier = TIERS - 1; tier >= 0; tier--) {
        const j0 = Math.floor((tier / TIERS) * (ROWS - 1));
        const j1 = Math.floor(((tier + 1) / TIERS) * (ROWS - 1));
        const near = 1 - tier / TIERS;            // 0 far .. 1 near
        const alpha = 0.06 + near * near * 0.72;
        const path = new Path2D();
        for (let j = j0; j < j1; j++) {
          for (let i = 0; i < COLS; i++) {
            const a = pts[j][i];
            if (!a) continue;
            const right = pts[j][i + 1];
            const down = pts[j + 1] && pts[j + 1][i];
            if (right) { path.moveTo(a.px, a.py); path.lineTo(right.px, right.py); }
            if (down) { path.moveTo(a.px, a.py); path.lineTo(down.px, down.py); }
          }
        }
        ctx.strokeStyle = hexA(accent, alpha);
        ctx.lineWidth = 1;
        ctx.shadowColor = accent;
        ctx.shadowBlur = near > 0.55 ? 7 * near : 0;
        ctx.stroke(path);
      }
      ctx.shadowBlur = 0;

      // glowing vertices on the near rows
      for (let j = 0; j < Math.floor(ROWS * 0.45); j++) {
        for (let i = 0; i < COLS; i += 2) {
          const a = pts[j][i];
          if (!a) continue;
          const near = 1 - j / ROWS;
          const peak = a.y > AMP * 0.32;
          if (!peak && Math.random() > 0.1) continue;
          ctx.beginPath();
          ctx.fillStyle = hexA(accent, 0.55 * near);
          ctx.arc(a.px, a.py, peak ? 1.7 : 1.0, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (animate && !reduce) raf = requestAnimationFrame(frame);
    }

    function hexA(hex, a) {
      // accept #rgb / #rrggbb
      let c = hex.replace("#", "");
      if (c.length === 3) c = c.split("").map((x) => x + x).join("");
      const r = parseInt(c.slice(0, 2), 16) || 197;
      const g = parseInt(c.slice(2, 4), 16) || 116;
      const b = parseInt(c.slice(4, 6), 16) || 247;
      return `rgba(${r},${g},${b},${a})`;
    }

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [density, animate]);

  return React.createElement("canvas", { ref: canvasRef, className: "terrain-canvas" });
}

window.WireframeTerrain = WireframeTerrain;
