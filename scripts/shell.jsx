/* ============================================================
   Shell — sidebar (file-tree nav), tab bar, status bar,
   command palette. Receives { route, navigate, theme, setTheme,
   openCmd, setOpenCmd, mobileOpen, setMobileOpen }.
   ============================================================ */
const { useRef: useRefShell } = React;
const S = window.SITE;

const ROUTE_FILE = {
  home: "index.astro",
  projects: "projects/index.astro",
  about: "about.md",
  now: "now.md",
  blog: "blog/index.astro",
  contact: "contact.sh",
};
function routeFile(route) {
  if (route.startsWith("project:")) return "work/" + route.slice(8) + ".md";
  if (route.startsWith("post:")) return "post/" + route.slice(5) + ".md";
  return ROUTE_FILE[route] || "index.astro";
}

/* ---------------- Sidebar ---------------- */
function Sidebar({ route, navigate, setOpenCmd, mobileOpen, setMobileOpen, projects = [], posts = [] }) {
  const [projOpen, setProjOpen] = useState(route === "projects" || route.startsWith("project:"));
  const [blogOpen, setBlogOpen] = useState(route === "blog" || route.startsWith("post:"));
  const activeProject = route.startsWith("project:") ? route.slice(8) : null;
  const activePost = route.startsWith("post:") ? route.slice(5) : null;

  const Item = ({ icon, label, ext, active, onClick, child }) => (
    <button className={"tree-item" + (active ? " active" : "") + (child ? " child" : "")} onClick={onClick}>
      {icon ? <span className="ico">{icon}</span> : <span style={{ width: 15 }} />}
      <span>{label}<span className="ext">{ext}</span></span>
    </button>
  );

  return (
    <>
      {mobileOpen && <div className="scrim" onClick={() => setMobileOpen(false)} />}
      <aside className={"sidebar" + (mobileOpen ? " open" : "")}>
        <div className="sb-brand">
          <div className="sb-dots"><i></i><i></i><i></i></div>
          <span className="path">~/<b>timurinal</b></span>
        </div>

        <div className="sb-explorer-label">Explorer</div>
        <nav className="sb-tree">
          <Item icon={<Ic.Home size={15} />} label="index" ext=".astro" active={route === "home"} onClick={() => navigate("home")} />

          <button className="tree-item" onClick={() => { setProjOpen((o) => !o); navigate("projects"); }} >
            <span className={"tree-caret" + (projOpen ? " open" : "")}><Ic.Chevron size={13} /></span>
            <span className="ico"><Ic.Folder size={15} /></span>
            <span>projects<span className="ext">/</span></span>
          </button>
          {projOpen && projects.map((p) => (
            <Item key={p.slug} child icon={<Ic.File size={14} />} label={p.slug} ext=".md"
              active={activeProject === p.slug} onClick={() => navigate("project:" + p.slug)} />
          ))}

          <Item icon={<Ic.User size={15} />} label="about" ext=".md" active={route === "about"} onClick={() => navigate("about")} />
          <Item icon={<Ic.Pulse size={15} />} label="now" ext=".md" active={route === "now"} onClick={() => navigate("now")} />

          <button className="tree-item" onClick={() => { setBlogOpen((o) => !o); navigate("blog"); }}>
            <span className={"tree-caret" + (blogOpen ? " open" : "")}><Ic.Chevron size={13} /></span>
            <span className="ico"><Ic.Pen size={15} /></span>
            <span>blog<span className="ext">/</span></span>
          </button>
          {blogOpen && posts.map((p) => (
            <Item key={p.slug} child icon={<Ic.File size={14} />} label={p.slug} ext=".md"
              active={activePost === p.slug} onClick={() => navigate("post:" + p.slug)} />
          ))}

          <Item icon={<Ic.Terminal size={15} />} label="contact" ext=".sh" active={route === "contact"} onClick={() => navigate("contact")} />
        </nav>

        <div className="sb-foot">
          <button className="sb-cmd" onClick={() => setOpenCmd(true)}>
            <span style={{ display: "flex", alignItems: "center", gap: 8 }}><Ic.Search size={13} /> Quick open</span>
            <span className="kbd">⌘K</span>
          </button>
        </div>
      </aside>
    </>
  );
}

/* ---------------- Tab bar ---------------- */
function TabBar({ route, navigate, setMobileOpen }) {
  const file = routeFile(route);
  return (
    <div className="tabbar">
      <button className="tab menu-btn" onClick={() => setMobileOpen(true)} style={{ padding: "0 14px" }}>
        <Ic.Menu size={16} />
      </button>
      <div className="tab active">
        <span className="dot" />
        <span>{file}</span>
        <span className="x" onClick={(e) => { e.stopPropagation(); navigate("home"); }} title="close"><Ic.Close size={12} /></span>
      </div>
    </div>
  );
}

/* ---------------- Status bar ---------------- */
function StatusBar({ route, theme, setTheme, setOpenCmd }) {
  return (
    <footer className="statusbar">
      <span className="sb-seg"><Ic.Git size={13} /> main</span>
      <span className="sb-seg">✓ build: passing</span>
      <span className="sb-seg" style={{ opacity: .8 }}>{routeFile(route)}</span>
      <span className="spacer" />
      <span className="sb-seg seg-btn" onClick={() => setOpenCmd(true)}><Ic.Search size={12} /> ⌘K</span>
      <a className="sb-seg seg-btn" href={S.person.matrix} target="_blank" rel="noopener"><Ic.Chat size={13} /> matrix</a>
      <a className="sb-seg seg-btn" href={S.person.github} target="_blank" rel="noopener"><Ic.Github size={13} /> github</a>
      <span className="sb-seg seg-btn" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        {theme === "dark" ? <Ic.Sun size={13} /> : <Ic.Moon size={13} />} {theme}
      </span>
      <span className="sb-seg"><span className="status-dot" /> online</span>
    </footer>
  );
}

/* ---------------- Command palette ---------------- */
function CommandPalette({ open, setOpen, navigate, projects = [], posts = [] }) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRefShell(null);

  const pages = [
    { id: "home", label: "Home", sub: "index.astro", icon: <Ic.Home size={16} /> },
    { id: "projects", label: "Projects", sub: "projects/", icon: <Ic.Folder size={16} /> },
    { id: "about", label: "About", sub: "about.md", icon: <Ic.User size={16} /> },
    { id: "now", label: "Now", sub: "now.md", icon: <Ic.Pulse size={16} /> },
    { id: "blog", label: "Blog", sub: "blog/", icon: <Ic.Pen size={16} /> },
    { id: "contact", label: "Contact", sub: "contact.sh", icon: <Ic.Terminal size={16} /> },
  ];
  const projItems = projects.map((p) => ({ id: "project:" + p.slug, label: p.title, sub: p.slug + ".md", icon: <Ic.File size={16} /> }));
  const postItems = posts.map((p) => ({ id: "post:" + p.slug, label: p.title, sub: "post/" + p.slug + ".md", icon: <Ic.Pen size={16} /> }));

  const ql = q.toLowerCase();
  const fPages = pages.filter((p) => p.label.toLowerCase().includes(ql));
  const fProjects = projItems.filter((p) => p.label.toLowerCase().includes(ql) || p.sub.includes(ql));
  const fPosts = postItems.filter((p) => p.label.toLowerCase().includes(ql) || p.sub.includes(ql));
  const flat = [...fPages, ...fProjects, ...fPosts];

  useEffect(() => { if (open) { setQ(""); setSel(0); setTimeout(() => inputRef.current && inputRef.current.focus(), 30); } }, [open]);
  useEffect(() => { setSel(0); }, [q]);

  if (!open) return null;

  function onKey(e) {
    if (e.key === "ArrowDown") { e.preventDefault(); setSel((s) => Math.min(s + 1, flat.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); if (flat[sel]) { navigate(flat[sel].id); setOpen(false); } }
    else if (e.key === "Escape") { setOpen(false); }
  }

  let idx = -1;
  const renderItem = (it) => {
    idx++;
    const myIdx = idx;
    return (
      <div key={it.id} className={"cmdk-item" + (myIdx === sel ? " sel" : "")}
        onMouseEnter={() => setSel(myIdx)}
        onClick={() => { navigate(it.id); setOpen(false); }}>
        <span className="ico">{it.icon}</span>
        <span>{it.label}</span>
        <span className="sub">{it.sub}</span>
      </div>
    );
  };

  return (
    <div className="cmdk-overlay" onClick={() => setOpen(false)}>
      <div className="cmdk" onClick={(e) => e.stopPropagation()} onKeyDown={onKey}>
        <div className="cmdk-input">
          <Ic.Search size={17} style={{ color: "var(--text-dim)" }} />
          <input ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Jump to a page or project…" />
          <span className="kbd">esc</span>
        </div>
        <div className="cmdk-list">
          {fPages.length > 0 && <div className="cmdk-group">Pages</div>}
          {fPages.map(renderItem)}
          {fProjects.length > 0 && <div className="cmdk-group">Projects</div>}
          {fProjects.map(renderItem)}
          {fPosts.length > 0 && <div className="cmdk-group">Posts</div>}
          {fPosts.map(renderItem)}
          {flat.length === 0 && <div className="cmdk-item" style={{ color: "var(--text-faint)" }}>No matches</div>}
        </div>
      </div>
    </div>
  );
}

window.Sidebar = Sidebar;
window.TabBar = TabBar;
window.StatusBar = StatusBar;
window.CommandPalette = CommandPalette;
window.routeFile = routeFile;
