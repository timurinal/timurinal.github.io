/* ============================================================
   Minimal Markdown -> HTML renderer.
   Supports: ## / ### headings, paragraphs, - lists, **bold**,
   `code`, [links](url), ![alt](src) images (incl. render: placeholders),
   and --- horizontal rules.  Enough to render the .md project bodies.
   ============================================================ */
(function () {
  function esc(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function inline(s) {
    s = esc(s);
    // images handled before this; here: bold, code, links
    s = s.replace(/`([^`]+)`/g, (_, c) => `<code>${c}</code>`);
    s = s.replace(/\*\*([^*]+)\*\*/g, (_, b) => `<strong>${b}</strong>`);
    s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, t, href) => {
      const external = /^https?:/.test(href);
      const attrs = external ? ' target="_blank" rel="noopener"' : "";
      return `<a href="${href}"${attrs}>${t}</a>`;
    });
    return s;
  }

  function imageBlock(alt, src) {
    // render: prefix => framed 16:9 figure. The real image (from public/)
    // sits on top; if it's missing it hides itself, revealing the labelled
    // striped placeholder underneath.
    if (src.startsWith("render:")) {
      const file = src.slice(7);
      const url = window.assetUrl(file);
      const label = alt && alt.trim() ? alt : file;
      return `<figure><div class="ph ar-16-9" data-label="${esc(file)}">` +
        `<img class="ph-img" src="${url}" alt="${esc(alt)}" loading="lazy" onerror="this.style.display='none'">` +
        `</div><figcaption>${esc(label)}</figcaption></figure>`;
    }
    // plain image => natural size, resolved against public/. Hidden if missing.
    const url = window.assetUrl(src);
    return `<figure><img src="${url}" alt="${esc(alt)}" loading="lazy" onerror="this.style.display='none'"><figcaption>${esc(alt)}</figcaption></figure>`;
  }

  window.renderMarkdown = function (md) {
    const lines = md.replace(/\r\n/g, "\n").split("\n");
    const out = [];
    let i = 0;
    let para = [];

    function flushPara() {
      if (para.length) {
        out.push(`<p>${inline(para.join(" "))}</p>`);
        para = [];
      }
    }

    while (i < lines.length) {
      let line = lines[i];

      // fenced code block:  ```lang  …  ```
      const fence = line.match(/^```\s*([\w+#-]*)\s*$/);
      if (fence) {
        flushPara();
        const lang = fence[1];
        const code = [];
        i++;
        while (i < lines.length && !/^```\s*$/.test(lines[i])) { code.push(lines[i]); i++; }
        i++; // consume the closing fence
        out.push(`<pre class="code"${lang ? ` data-lang="${lang}"` : ""}><code>${esc(code.join("\n"))}</code></pre>`);
        continue;
      }

      // standalone image line
      const imgM = line.match(/^!\[([^\]]*)\]\(([^)]+)\)\s*$/);
      if (imgM) {
        flushPara();
        out.push(imageBlock(imgM[1], imgM[2]));
        i++;
        continue;
      }

      if (/^###\s+/.test(line)) { flushPara(); out.push(`<h3>${inline(line.replace(/^###\s+/, ""))}</h3>`); i++; continue; }
      if (/^##\s+/.test(line))  { flushPara(); out.push(`<h2>${inline(line.replace(/^##\s+/, ""))}</h2>`); i++; continue; }
      if (/^---\s*$/.test(line)) { flushPara(); out.push("<hr>"); i++; continue; }

      if (/^\s*[-*]\s+/.test(line)) {
        flushPara();
        const items = [];
        while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
          items.push(`<li>${inline(lines[i].replace(/^\s*[-*]\s+/, ""))}</li>`);
          i++;
        }
        out.push(`<ul>${items.join("")}</ul>`);
        continue;
      }

      if (/^\s*$/.test(line)) { flushPara(); i++; continue; }

      para.push(line.trim());
      i++;
    }
    flushPara();
    return out.join("\n");
  };
})();
