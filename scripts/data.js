/* ============================================================
   SITE DATA  —  static, non-Markdown content (identity, stats,
   skills, about timeline, /now).

   Projects and blog posts are NOT here anymore — they live as
   Markdown files in content/work/ and content/post/ and are
   loaded at runtime by content-loader.js. Drop a file in, add it
   to that folder's index.json, refresh.
   ============================================================ */
window.SITE = {
  person: {
    name: "Timur Inal",
    role: "Engine & graphics programmer",
    age: 16,
    tagline: "I build game engines, renderers and voxel worlds from scratch.",
    blurb: "16-year-old, home-educated, self-taught since age 6. Strongest in C++ and low-level graphics — OpenGL today, Vulkan next.",
    matrix: "https://matrix.to/#/@timurinal:matrix.org",
    github: "https://github.com/timurinal",
    email: "mailto:hello@timurinal.co.uk",
  },

  stats: [
    { n: "4", label: "Minecraft clones, from scratch" },
    { n: "2", label: "path tracers (Unity + HLSL)" },
    { n: "1", label: "ECS game engine in C++" },
    { n: "8", label: "GCSE CS — grade 8, two years early" },
  ],

  skills: [
    { group: "Languages", items: ["C / C++", "C#", "Python", "HLSL / GLSL", "JS"] },
    { group: "Graphics", items: ["OpenGL", "Vulkan (learning)", "Ray / path tracing", "Voxels", "PBR · LabPBR"] },
    { group: "Engines & tools", items: ["Unity", "Dear ImGui", "Git / GitHub", "Linux", "OpenTK"] },
  ],

  // ---------------------------------------------------------- ABOUT
  // Long-form bio, kept faithful to the original About page.
  timeline: [
    { age: "Age 6", year: "", t: "First code", d: "Started by making Minecraft mods. The spark that started everything." },
    { age: "Age 8–9", year: "", t: "Unity + C#", d: "Moved into making games. Taught myself C# from YouTube; picked up Python and some HTML/JS alongside, but C# was strongest." },
    { age: "—", year: "", t: "A pile of Unity projects", d: "Real-time atmosphere, two path tracers, a GPU planet generator, networked multiplayer with server-authoritative movement, and the BeamOut timer app." },
    { age: "Age 14", year: "", t: "Down to the metal", d: "Wanted my own engine, so I started OpenGL — first via OpenTK in C#, then from complete scratch. Learned C over a weekend with LearnOpenGL." },
    { age: "—", year: "", t: "Hello, C++", d: "Hit the limits of C and moved to C++ — now my strongest and favourite language. Got translucency, transparent-face sorting, an advanced block loader, and full block interaction working." },
    { age: "—", year: "", t: "First game engine", d: "Built a C++/OpenGL engine with a dynamic ECS, hierarchy, parent-child architecture and Dear ImGui UI. Planning a cleaner, voxel-first successor." },
    { age: "Age 14", year: "", t: "GCSE Computer Science — grade 8", d: "Sat it two years early as a home-educated student. Months of past papers to fill the gaps; came out with a grade 8 (equivalent to an A*)." },
    { age: "Now", year: "", t: "Voxel ray tracer", d: "A LabPBR-compliant voxel ray tracer with a custom ray-traced parallax-mapping technique — real 3D geometry at relatively low cost." },
  ],

  now: {
    updated: "June 2026",
    items: [
      { t: "Voxel ray tracer", d: "LabPBR-compliant renderer storing voxels in a 3D texture. Currently building a ray-marched parallax-mapping technique for proper depth at low cost.", tag: "active" },
      { t: "Engine v2", d: "Planning a cleaner, more modular rewrite of my C++ engine — voxel-first, with a built-in ray tracer or greedy mesher for rendering.", tag: "planning" },
      { t: "Learning Vulkan", d: "Stepping below OpenGL to understand explicit GPU control, synchronisation and memory management.", tag: "learning" },
    ],
  },
};
