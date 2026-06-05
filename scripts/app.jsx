/* ============================================================
   App root — routing (hash-based), theme, command palette,
   tweaks. Mounts the whole shell.
   ============================================================ */
const { useState: uS, useEffect: uE, useRef: uR } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": ["#c574f7", "#a855f7", "#7611a6"],
  "headingFont": "mono",
  "terrainAnim": true,
  "terrainDensity": 1,
  "bodyScale": 16
}/*EDITMODE-END*/;

/* ---- hash <-> internal route ---- */
function hashToRoute(h) {
  h = (h || "").replace(/^#/, "");
  if (!h || h === "/" ) return "home";
  const parts = h.split("/").filter(Boolean); // ["projects","slug"]
  if (parts[0] === "projects" && parts[1]) return "project:" + parts[1];
  if (parts[0] === "projects") return "projects";
  if (parts[0] === "blog" && parts[1]) return "post:" + parts[1];
  if (["about", "now", "blog", "contact", "home"].includes(parts[0])) return parts[0];
  return "home";
}
function routeToHash(route) {
  if (route === "home") return "#/";
  if (route.startsWith("project:")) return "#/projects/" + route.slice(8);
  if (route.startsWith("post:")) return "#/blog/" + route.slice(5);
  return "#/" + route;
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [route, setRoute] = uS(() => hashToRoute(window.location.hash));
  const [theme, setTheme] = uS(() => localStorage.getItem("ti-theme") || "dark");
  const [openCmd, setOpenCmd] = uS(false);
  const [mobileOpen, setMobileOpen] = uS(false);
  const viewportRef = uR(null);
  window.__viewportRef = viewportRef;

  // collections (markdown-driven) — for sidebar tree + command palette
  const projects = useCollection("work") || [];
  const posts = useCollection("post") || [];

  // theme
  uE(() => { document.documentElement.setAttribute("data-theme", theme); localStorage.setItem("ti-theme", theme); }, [theme]);

  // apply accent + body scale tweaks to :root
  uE(() => {
    const r = document.documentElement;
    const [bright, solid, deep] = t.accent;
    r.style.setProperty("--accent", bright);
    r.style.setProperty("--accent-2", solid);
    r.style.setProperty("--accent-deep", deep);
    const rgb = hexToRgb(bright);
    r.style.setProperty("--accent-tint", `rgba(${rgb},0.12)`);
    r.style.setProperty("--accent-tint-2", `rgba(${rgb},0.20)`);
    r.style.setProperty("--accent-line", `rgba(${rgb},0.55)`);
    r.style.setProperty("--glow", `rgba(${hexToRgb(solid)},0.35)`);
  }, [t.accent]);

  uE(() => {
    document.documentElement.style.setProperty("--head-font", t.headingFont === "sans" ? "var(--sans)" : "var(--mono)");
  }, [t.headingFont]);

  uE(() => { document.body.style.fontSize = t.bodyScale + "px"; }, [t.bodyScale]);

  // hash routing
  uE(() => {
    const onHash = () => { setRoute(hashToRoute(window.location.hash)); setMobileOpen(false); };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const navigate = (r) => {
    const h = routeToHash(r);
    if (window.location.hash !== h) window.location.hash = h;
    else setRoute(r);
    if (viewportRef.current) viewportRef.current.scrollTop = 0;
  };

  // cmd+k
  uE(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpenCmd((o) => !o); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // scroll top on route change
  uE(() => { if (viewportRef.current) viewportRef.current.scrollTop = 0; }, [route]);

  let page;
  if (route === "home") page = <HomePage navigate={navigate} terrainDensity={t.terrainDensity} terrainAnim={t.terrainAnim} />;
  else if (route === "projects") page = <ProjectsPage navigate={navigate} />;
  else if (route.startsWith("project:")) page = <ProjectDetail slug={route.slice(8)} navigate={navigate} />;
  else if (route === "about") page = <AboutPage navigate={navigate} />;
  else if (route === "now") page = <NowPage navigate={navigate} />;
  else if (route === "blog") page = <BlogPage navigate={navigate} />;
  else if (route.startsWith("post:")) page = <BlogPost slug={route.slice(5)} navigate={navigate} />;
  else if (route === "contact") page = <ContactPage />;
  else page = <HomePage navigate={navigate} terrainDensity={t.terrainDensity} terrainAnim={t.terrainAnim} />;

  return (
    <div className="app">
      <Sidebar route={route} navigate={navigate} setOpenCmd={setOpenCmd} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} projects={projects} posts={posts} />
      <div className="main">
        <TabBar route={route} navigate={navigate} setMobileOpen={setMobileOpen} />
        <div className="viewport" ref={viewportRef}>{page}</div>
      </div>
      <StatusBar route={route} theme={theme} setTheme={setTheme} setOpenCmd={setOpenCmd} />
      <CommandPalette open={openCmd} setOpen={setOpenCmd} navigate={navigate} projects={projects} posts={posts} />

      <TweaksPanel>
        <TweakSection label="Identity" />
        <TweakColor label="Accent" value={t.accent}
          options={[["#c574f7", "#a855f7", "#7611a6"], ["#5cd9f5", "#22b8e0", "#0e6e8c"], ["#5ef0a8", "#22c55e", "#0f7a45"], ["#f7c25c", "#e0a020", "#9a6a0e"]]}
          onChange={(v) => setTweak("accent", v)} />
        <TweakRadio label="Headings" value={t.headingFont} options={["mono", "sans"]} onChange={(v) => setTweak("headingFont", v)} />
        <TweakSection label="Hero terrain" />
        <TweakToggle label="Animate" value={t.terrainAnim} onChange={(v) => setTweak("terrainAnim", v)} />
        <TweakSlider label="Density" value={t.terrainDensity} min={0.6} max={1.4} step={0.1} onChange={(v) => setTweak("terrainDensity", v)} />
        <TweakSection label="Reading" />
        <TweakSlider label="Body size" value={t.bodyScale} min={14} max={18} step={1} unit="px" onChange={(v) => setTweak("bodyScale", v)} />
      </TweaksPanel>
    </div>
  );
}

function hexToRgb(hex) {
  let c = hex.replace("#", "");
  if (c.length === 3) c = c.split("").map((x) => x + x).join("");
  return `${parseInt(c.slice(0, 2), 16)},${parseInt(c.slice(2, 4), 16)},${parseInt(c.slice(4, 6), 16)}`;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
