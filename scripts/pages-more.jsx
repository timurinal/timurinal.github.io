/* ============================================================
   Pages: About, Now, Blog, Contact
   ============================================================ */
const SM = window.SITE;

/* ----------------------------- ABOUT ---------------------------- */
function AboutPage({ navigate }) {
  return (
    <div className="page container page-pad">
      <div className="page-head">
        <div className="kicker kick">// whoami</div>
        <h1>About</h1>
        <p className="sub">A self-taught, home-educated developer chasing one goal: writing the engine, not just using it.</p>
      </div>

      <div className="about-grid">
        <div>
          <p style={{ fontSize: 18, color: "var(--text-body)", lineHeight: 1.65, maxWidth: "62ch" }}>
            Hi, I'm Timur — a {SM.person.age}-year-old student who wants to get into game-engine programming. I've loved
            programming since I was six, when I started making Minecraft mods. That turned into wanting to make games, so I
            taught myself C# (and some Python and JS) from YouTube and built a long trail of unfinished-but-educational Unity
            projects. At fourteen I went lower-level — OpenGL, then C, then C++ — to start building my own engine.
          </p>

          <div className="rule" style={{ margin: "44px 0 30px" }}>
            <span className="lbl">timeline</span><span className="ln" />
          </div>

          <div className="timeline">
            {SM.timeline.map((tl, i) => (
              <div className="tl-item" key={i}>
                <div className="age">{tl.age}</div>
                <h4>{tl.t}</h4>
                <p>{tl.d}</p>
              </div>
            ))}
          </div>

          <div className="rule" style={{ margin: "10px 0 26px" }}>
            <span className="lbl">today</span><span className="ln" />
          </div>
          <p className="dim" style={{ maxWidth: "62ch", fontSize: 15.5 }}>
            I'm now working on more advanced projects — chiefly a voxel ray tracer with a custom ray-traced parallax-mapping
            technique and full LabPBR support. There's always another renderer to write.
          </p>
          <div style={{ marginTop: 30, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button className="btn" onClick={() => navigate("now")}>what I'm building now <Ic.Arrow size={15} className="arr" /></button>
            <button className="btn" onClick={() => navigate("contact")}>get in touch <Ic.Arrow size={15} className="arr" /></button>
          </div>
        </div>

        <div className="skill-card">
          <div className="kicker" style={{ marginBottom: 18 }}>// skills</div>
          {SM.skills.map((g) => (
            <div className="skill-group" key={g.group}>
              <div className="gt">{g.group}</div>
              <div className="tags">{g.items.map((s) => <span key={s} className="chip">{s}</span>)}</div>
            </div>
          ))}
          <div className="skill-group" style={{ borderTop: "1px solid var(--border)", paddingTop: 18 }}>
            <div className="gt">Education</div>
            <p className="dim" style={{ fontSize: 13.5, lineHeight: 1.5 }}>GCSE Computer Science — grade 8 (A*), sat two years early as a home-educated student.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ NOW ----------------------------- */
function NowPage({ navigate }) {
  return (
    <div className="page container page-pad">
      <div className="page-head">
        <div className="kicker kick">// now · updated {SM.now.updated}</div>
        <h1>What I'm building</h1>
        <p className="sub">A snapshot of what has my attention right now. Inspired by Derek Sivers' <a href="https://nownownow.com/about" target="_blank" rel="noopener">/now</a> pages.</p>
      </div>

      <div className="now-list">
        {SM.now.items.map((n, i) => (
          <div className="now-card" key={i}>
            <span className={"badge" + (n.tag === "active" ? " active" : "")}>{n.tag}</span>
            <div>
              <h4>{n.t}</h4>
              <p>{n.d}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="block-gap" style={{ display: "flex", gap: 12 }}>
        <button className="btn" onClick={() => navigate("projects")}>see finished work <Ic.Arrow size={15} className="arr" /></button>
      </div>
    </div>
  );
}

/* ------------------------------ BLOG ---------------------------- */
function PostRow({ p, i, navigate }) {
  return (
    <button className="proj-row post-row" onClick={() => navigate("post:" + p.slug)}>
      <span className="idx">{String(i + 1).padStart(2, "0")}</span>
      <div className="body">
        <h3>{p.title}</h3>
        <p>{p.description}</p>
        {p.tags && p.tags.length > 0 && <TagRow tags={p.tags} />}
      </div>
      <div className="end">
        <span className="date">{fmtDate(p.publishDate)}</span>
        <span className="go"><Ic.Arrow size={18} /></span>
      </div>
    </button>
  );
}

function BlogPage({ navigate }) {
  const posts = useCollection("post");

  return (
    <div className="page container page-pad">
      <div className="page-head">
        <div className="kicker kick">// {posts ? posts.length : "…"} posts · content/post/</div>
        <h1>Blog</h1>
        <p className="sub">Notes on graphics, engines and the rabbit-holes in between.</p>
      </div>

      {posts === null && (
        <p className="dim" style={{ padding: "30px 0", fontFamily: "var(--mono)", fontSize: 14 }}>loading posts…</p>
      )}

      {posts && posts.length > 0 && (
        <div className="proj-list">
          {posts.map((p, i) => <PostRow key={p.slug} p={p} i={i} navigate={navigate} />)}
        </div>
      )}

      {posts && posts.length === 0 && (
        <div className="blog-empty">
          <div className="glyph">$ ls content/post/ → 0 posts</div>
          <h3>No posts published yet</h3>
          <p>I've not posted anything yet! Check back later for if I've added anything.</p>
          <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
            <button className="btn" onClick={() => navigate("projects")}>read project write-ups <Ic.Arrow size={15} className="arr" /></button>
          </div>
        </div>
      )}
    </div>
  );
}

/* --------------------------- BLOG POST -------------------------- */
function BlogPost({ slug, navigate }) {
  const posts = useCollection("post");
  const viewportRef = window.__viewportRef;
  useEffect(() => { if (viewportRef && viewportRef.current) viewportRef.current.scrollTop = 0; }, [slug]);
  if (posts === null) return <div className="page container page-pad"><p className="dim" style={{ fontFamily: "var(--mono)" }}>loading…</p></div>;
  const idx = posts.findIndex((p) => p.slug === slug);
  const p = posts[idx];
  if (!p) return <div className="page container page-pad"><p>Post not found.</p></div>;
  const prev = posts[idx - 1];
  const next = posts[idx + 1];
  const html = window.renderMarkdown(p.body);

  return (
    <div className="page container page-pad">
      <div className="crumb">
        <button onClick={() => navigate("blog")}>blog</button>
        <span className="sep">/</span>
        <span className="cur">{p.file}</span>
      </div>

      <div className="detail-head">
        {p.tags && p.tags.length > 0 && <div className="kicker" style={{ marginBottom: 14 }}>// {p.tags.join(" · ")}</div>}
        <h1>{p.title}</h1>
        {p.description && <p className="desc">{p.description}</p>}
        <div className="detail-meta">
          <span>published · {fmtDate(p.publishDate)}</span>
          {p.tags && p.tags.length > 0 && <span style={{ color: "var(--text-faint)" }}>·</span>}
          {p.tags && p.tags.length > 0 && <TagRow tags={p.tags} />}
        </div>
      </div>

      <article className="prose" style={{ maxWidth: "70ch", marginTop: 40 }} dangerouslySetInnerHTML={{ __html: html }} />

      <div className="proj-nav">
        {prev ? <a onClick={() => navigate("post:" + prev.slug)}><span className="k">← prev</span>{prev.title}</a> : <span />}
        {next ? <a className="r" onClick={() => navigate("post:" + next.slug)}><span className="k">next →</span>{next.title}</a> : <span />}
      </div>
    </div>
  );
}

/* ----------------------------- CONTACT -------------------------- */
function ContactPage() {
  const channels = [
    { icon: <Ic.Chat size={18} />, label: "Matrix · primary", value: "@timurinal:matrix.org", href: SM.person.matrix },
    { icon: <Ic.Github size={18} />, label: "GitHub · primary", value: "github.com/timurinal", href: SM.person.github },
    { icon: <Ic.Mail size={18} />, label: "Email", value: "hello@timurinal.co.uk", href: SM.person.email },
  ];
  return (
    <div className="page container page-pad">
      <div className="page-head">
        <div className="kicker kick">// ./contact.sh</div>
        <h1>Get in touch</h1>
        <p className="sub">Matrix and GitHub are my main channels. Happy to talk graphics, engines, or anything low-level.</p>
      </div>

      <div className="term" style={{ maxWidth: 760 }}>
        <div className="term-bar">
          <div className="sb-dots"><i style={{ background: "#ef5f5f" }}></i><i style={{ background: "#e0aa3e" }}></i><i style={{ background: "#3fb98a" }}></i></div>
          <span className="title">timurinal@portfolio: ~/contact</span>
        </div>
        <div className="term-body">
          <div><span className="prompt">timurinal@web</span>:<span style={{ color: "var(--accent-2)" }}>~</span>$ ./contact.sh --list</div>
          <div className="out">→ resolving channels… 3 found. pick one below ↓</div>

          <div className="term-channels">
            {channels.map((c) => (
              <a key={c.label} className="chan" href={c.href} target="_blank" rel="noopener">
                <span className="ci">{c.icon}</span>
                <span>
                  <span className="cl">{c.label}</span><br />
                  <span className="cv">{c.value}</span>
                </span>
              </a>
            ))}
          </div>

          <div style={{ marginTop: 22 }}><span className="prompt">timurinal@web</span>:<span style={{ color: "var(--accent-2)" }}>~</span>$ <span className="cursor-term">_</span></div>
        </div>
      </div>
    </div>
  );
}

window.AboutPage = AboutPage;
window.NowPage = NowPage;
window.BlogPage = BlogPage;
window.BlogPost = BlogPost;
window.ContactPage = ContactPage;
