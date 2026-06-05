/* ============================================================
   Core pages: Home, Projects, ProjectDetail
   ============================================================ */
const ST = window.SITE;

function fmtDate(d) {
  const dt = new Date(d);
  return dt.toLocaleDateString("en-GB", { year: "numeric", month: "short" });
}

function Thumb({ p, className }) {
  const url = window.assetUrl(p.img);
  return (
    <div className={"ph " + (className || "")} data-label={"img · " + p.img}>
      {p.img && <img className="ph-img" src={url} alt={p.img_alt || ""} loading="lazy" onError={(e) => { e.currentTarget.style.display = "none"; }} />}
    </div>
  );
}

function TagRow({ tags, max }) {
  const list = max ? tags.slice(0, max) : tags;
  return (
    <div className="tags">
      {list.map((t) => <span key={t} className="chip">{t}</span>)}
    </div>
  );
}

/* ----------------------------- HOME ----------------------------- */
function HomePage({ navigate, terrainDensity, terrainAnim }) {
  const projects = useCollection("work");
  const featured = (projects || []).filter((p) => p.featured);
  return (
    <div className="page">
      <section className="hero">
        <WireframeTerrain density={terrainDensity} animate={terrainAnim} />
        <div className="hero-veil" />
        <div className="container hero-inner">
          <div className="kicker fade-up">// {ST.person.age} y/o · {ST.person.role.toLowerCase()} · self-taught</div>
          <h1 className="fade-up" style={{ animationDelay: ".05s" }}>
            {ST.person.name}<span className="cursor" />
          </h1>
          <p className="lead fade-up" style={{ animationDelay: ".12s" }}>
            I build game engines, renderers and voxel worlds from scratch — in C++, OpenGL and HLSL. Four Minecraft clones, two path tracers, and one ECS engine deep.
          </p>
          <div className="cta fade-up" style={{ animationDelay: ".18s" }}>
            <button className="btn primary" onClick={() => navigate("projects")}>
              view projects <Ic.Arrow size={16} className="arr" />
            </button>
            <button className="btn" onClick={() => navigate("about")}>
              read about <Ic.Arrow size={16} className="arr" />
            </button>
          </div>
          <div className="meta-line fade-up" style={{ animationDelay: ".26s" }}>
            <span className="blip" /> currently building a ray-traced voxel renderer · LabPBR-compliant
          </div>
        </div>
      </section>

      <div className="container" style={{ marginTop: 36 }}>
        <div className="stats">
          {ST.stats.map((s, i) => (
            <div className="stat" key={i}>
              <div className="n">{s.n}</div>
              <div className="l">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="container block-gap">
        <div className="sec-head">
          <h2><span className="hash">#</span> featured work</h2>
          <span className="link" onClick={() => navigate("projects")}>all projects <Ic.Arrow size={14} /></span>
        </div>
        <div className="proj-list" style={{ borderTop: "1px solid var(--border)" }}>
          {projects === null
            ? <div className="dim" style={{ padding: "30px 0", fontFamily: "var(--mono)", fontSize: 14 }}>loading work…</div>
            : featured.map((p, i) => (
                <ProjectRow key={p.slug} p={p} i={i} navigate={navigate} />
              ))}
        </div>
      </div>

      <div className="container block-gap" style={{ paddingBottom: 100 }}>
        <div className="ph ar-16-9" data-label="" style={{ display: "none" }}></div>
        <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius)", background: "var(--bg-elev)", padding: "40px 44px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
          <div>
            <div className="kicker" style={{ marginBottom: 10 }}>// next</div>
            <h2 style={{ fontSize: 26 }}>Want the full story?</h2>
            <p className="dim" style={{ marginTop: 10, maxWidth: "52ch" }}>From Minecraft mods at six to a grade-8 GCSE two years early — the whole path is on the about page.</p>
          </div>
          <button className="btn primary" onClick={() => navigate("about")}>about me <Ic.Arrow size={16} className="arr" /></button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------- PROJECT ROW -------------------------- */
function ProjectRow({ p, i, navigate }) {
  return (
    <button className="proj-row" onClick={() => navigate("project:" + p.slug)}>
      <span className="idx">{String(i + 1).padStart(2, "0")}</span>
      <Thumb p={p} className="thumb" />
      <div className="body">
        <h3>{p.title}</h3>
        <p>{p.description}</p>
        <TagRow tags={p.tags} />
      </div>
      <div className="end">
        <span className="date">{fmtDate(p.publishDate)}</span>
        <span className="go"><Ic.Arrow size={18} /></span>
      </div>
    </button>
  );
}

/* --------------------------- PROJECTS --------------------------- */
function ProjectsPage({ navigate }) {
  const projects = useCollection("work");
  const [filter, setFilter] = useState("All");

  if (projects === null) {
    return (
      <div className="page container page-pad">
        <div className="page-head">
          <div className="kicker kick">// content/work/</div>
          <h1>Projects</h1>
        </div>
        <p className="dim" style={{ padding: "30px 0", fontFamily: "var(--mono)", fontSize: 14 }}>loading work…</p>
      </div>
    );
  }

  const allTags = ["All", ...Array.from(new Set(projects.flatMap((p) => p.tags)))];
  const list = filter === "All" ? projects : projects.filter((p) => p.tags.includes(filter));

  return (
    <div className="page container page-pad">
      <div className="page-head">
        <div className="kicker kick">// {projects.length} projects · content/work/</div>
        <h1>Projects</h1>
        <p className="sub">Graphics, engines and voxels — mostly built from scratch to understand how the layer beneath actually works.</p>
      </div>

      <div className="filterbar">
        <span className="label">filter:</span>
        {allTags.map((t) => (
          <button key={t} className={"chip btn" + (filter === t ? " on" : "")} onClick={() => setFilter(t)}>{t}</button>
        ))}
      </div>

      <div className="proj-list">
        {list.map((p, i) => <ProjectRow key={p.slug} p={p} i={i} navigate={navigate} />)}
        {list.length === 0 && <p className="dim" style={{ padding: "30px 0" }}>No projects with that tag yet.</p>}
      </div>
    </div>
  );
}

/* ------------------------ PROJECT DETAIL ------------------------ */
function ProjectDetail({ slug, navigate }) {
  const projects = useCollection("work");
  const viewportRef = window.__viewportRef;
  useEffect(() => { if (viewportRef && viewportRef.current) viewportRef.current.scrollTop = 0; }, [slug]);
  if (projects === null) return <div className="page container page-pad"><p className="dim" style={{ fontFamily: "var(--mono)" }}>loading…</p></div>;
  const idx = projects.findIndex((p) => p.slug === slug);
  const p = projects[idx];
  if (!p) return <div className="page container page-pad"><p>Project not found.</p></div>;
  const prev = projects[idx - 1];
  const next = projects[idx + 1];
  const html = window.renderMarkdown(p.body);

  return (
    <div className="page container page-pad">
      <div className="crumb">
        <button onClick={() => navigate("projects")}>projects</button>
        <span className="sep">/</span>
        <span className="cur">{p.file}</span>
      </div>

      <div className="detail-head">
        <div className="kicker" style={{ marginBottom: 14 }}>// {p.tags.join(" · ")}</div>
        <h1>{p.title}</h1>
        <p className="desc">{p.description}</p>
        <div className="detail-meta">
          <span>published · {fmtDate(p.publishDate)}</span>
          <span style={{ color: "var(--text-faint)" }}>·</span>
          <TagRow tags={p.tags} />
        </div>
      </div>

      <div className="ph ar-16-9" data-label={"hero · " + p.img} style={{ marginTop: 36 }}>
        {p.img && <img className="ph-img" src={window.assetUrl(p.img)} alt={p.img_alt || ""} onError={(e) => { e.currentTarget.style.display = "none"; }} />}
      </div>

      <div className="detail-layout">
        <article className="prose" dangerouslySetInnerHTML={{ __html: html }} />
        <aside className="detail-aside">
          <div className="aside-block">
            <div className="t">Stack</div>
            <div className="tags" style={{ flexDirection: "column", alignItems: "flex-start" }}>
              {p.tags.map((t) => <span key={t} className="chip accent">{t}</span>)}
            </div>
          </div>
          <div className="aside-block">
            <div className="t">Links</div>
            <div className="links">
              {p.repo && <a href={p.repo} target="_blank" rel="noopener"><Ic.Github size={15} /> source code</a>}
              <a href={ST.person.github} target="_blank" rel="noopener"><Ic.Github size={15} /> github profile</a>
              <a href={ST.person.matrix} target="_blank" rel="noopener"><Ic.Chat size={15} /> message me</a>
            </div>
          </div>
          <div className="aside-block">
            <div className="t">Published</div>
            <div className="mono" style={{ fontSize: 13, color: "var(--text-dim)" }}>{new Date(p.publishDate).toISOString().slice(0, 10)}</div>
          </div>
        </aside>
      </div>

      <div className="proj-nav">
        {prev ? <a onClick={() => navigate("project:" + prev.slug)}><span className="k">← prev</span>{prev.title}</a> : <span />}
        {next ? <a className="r" onClick={() => navigate("project:" + next.slug)}><span className="k">next →</span>{next.title}</a> : <span />}
      </div>
    </div>
  );
}

window.HomePage = HomePage;
window.ProjectsPage = ProjectsPage;
window.ProjectDetail = ProjectDetail;
