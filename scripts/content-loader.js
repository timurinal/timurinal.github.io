/* ============================================================
   CONTENT LOADER  —  the Astro-style authoring workflow, static.

   Markdown lives in:
     content/work/*.md   → projects   (collection "work")
     content/post/*.md   → blog posts (collection "post")

   Each folder has an index.json listing its filenames, e.g.
     ["voxel-game.md", "voxel-ray-tracer.md"]

   Every .md file carries YAML-ish frontmatter, then the body:
     ---
     title: Voxel Game
     publishDate: 2025-10-15
     featured: true
     description: "A Minecraft-style voxel engine…"
     tags: [OpenGL, C#, Voxels]
     ---
     Body markdown here…

   At runtime each file is fetched, the frontmatter parsed, and the
   body rendered by markdown.js. Drop a file in, add it to index.json,
   refresh — it's live. No build step, no editing component code.
   ============================================================ */
(function () {
  /* ---- frontmatter parser (small YAML subset) ---- */
  function parseScalar(v) {
    v = v.trim();
    // array:  [a, b, c]
    if (/^\[.*\]$/.test(v)) {
      return v.slice(1, -1)
        .split(",")
        .map((s) => s.trim().replace(/^["']|["']$/g, ""))
        .filter((s) => s.length);
    }
    // quoted string
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      return v.slice(1, -1);
    }
    if (v === "true") return true;
    if (v === "false") return false;
    return v;
  }

  function parseFrontmatter(text) {
    text = text.replace(/\r\n/g, "\n");
    const m = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
    if (!m) return { data: {}, body: text.trim() };
    const data = {};
    m[1].split("\n").forEach((line) => {
      if (!line.trim() || /^\s*#/.test(line)) return;
      const mm = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/);
      if (!mm) return;
      data[mm[1]] = parseScalar(mm[2]);
    });
    return { data, body: m[2].replace(/^\n+/, "") };
  }

  /* ---- collection loader (cached) ---- */
  const cache = {};

  function loadCollection(name) {
    if (cache[name]) return cache[name];
    cache[name] = (async () => {
      const dir = "content/" + name + "/";
      let files = [];
      try {
        const res = await fetch(dir + "index.json", { cache: "no-cache" });
        if (res.ok) files = await res.json();
      } catch (e) {
        console.warn("[content] could not read", dir + "index.json", e);
      }
      const entries = await Promise.all(
        files.map(async (fn) => {
          try {
            const res = await fetch(dir + fn, { cache: "no-cache" });
            const text = await res.text();
            const { data, body } = parseFrontmatter(text);
            return {
              ...data,
              slug: data.slug || fn.replace(/\.md$/, ""),
              file: fn,
              tags: data.tags || [],
              body,
            };
          } catch (e) {
            console.warn("[content] failed to load", dir + fn, e);
            return null;
          }
        })
      );
      return entries
        .filter(Boolean)
        .sort((a, b) => new Date(b.publishDate || 0) - new Date(a.publishDate || 0));
    })();
    return cache[name];
  }

  window.Content = { loadCollection, parseFrontmatter };
})();

/* ---- React hook: returns null while loading, then the entries array ---- */
function useCollection(name) {
  const [data, setData] = React.useState(null);
  React.useEffect(() => {
    let alive = true;
    window.Content.loadCollection(name).then((d) => {
      if (alive) setData(d);
    });
    return () => {
      alive = false;
    };
  }, [name]);
  return data;
}

/* ============================================================
   IMAGES.  Drop image files in the public/ folder and reference
   them by name — in frontmatter (img: voxel-game.png) or in a
   post/project body (![alt](voxel-game.png)). Subfolders work:
   img: path-tracer/shot.png  →  public/path-tracer/shot.png.

   Change ASSET_BASE below if you keep images somewhere else.
   Absolute paths (https://… or /foo.png) are used unchanged.
   ============================================================ */
window.ASSET_BASE = "public/";

function assetUrl(src) {
  if (!src) return "";
  if (/^(https?:)?\/\//.test(src) || src.startsWith("/") || src.startsWith("data:")) return src;
  return window.ASSET_BASE + src.replace(/^\.?\//, "");
}
window.assetUrl = assetUrl;
