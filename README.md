# Timur Inal — Portfolio

Personal portfolio site. Static HTML/CSS/JS (React). The app ships as a
precompiled bundle, so the browser does no in-page transpiling and loads fast.
Every file is served exactly as-is — no server needed.

## Deploy to GitHub Pages

1. **Create a repo.** On GitHub, make a new repository. For a user
   site, name it exactly `YOUR-USERNAME.github.io`. For a project site,
   any name works (e.g. `portfolio`).

2. **Upload the files.** Drag the *contents* of this folder (the
   `index.html`, `styles.css`, `pages.css`, `scripts/`, `content/`, and
   `.nojekyll`) into the repo — not the enclosing folder itself.
   `index.html` must sit at the repo root. Commit.

3. **Turn on Pages.** Repo → **Settings → Pages** → under *Build and
   deployment*, set **Source: Deploy from a branch**, branch **main**,
   folder **/ (root)**. Save.

4. **Wait ~1 minute,** then visit:
   - User site: `https://YOUR-USERNAME.github.io`
   - Project site: `https://YOUR-USERNAME.github.io/REPO-NAME/`

That's it. The site uses hash-based routing (`#/projects`, etc.), so deep
links and refreshes work without any server config.

## After it's live — recommended steps

- **Custom domain** (e.g. `timurinal.co.uk`): Settings → Pages → *Custom
  domain*. Add the domain there, then at your DNS provider create either an
  `ALIAS`/`ANAME` on the apex pointing to `YOUR-USERNAME.github.io`, or four
  `A` records to GitHub's IPs (`185.199.108.153`, `.109.153`, `.110.153`,
  `.111.153`). Tick **Enforce HTTPS** once the cert issues.
- **Favicon** — none is set yet; add a `favicon.ico`/`favicon.svg` to the
  root and link it in `index.html` so the browser tab shows your mark.
- **Check the links** on the contact page point to the right
  Matrix / GitHub / email handles before you announce it.

## Writing content (projects & blog)

Projects and blog posts are **Markdown files** — no code editing.

```
content/
  work/                 ← projects
    index.json          ← list of the .md filenames in this folder
    voxel-game.md
    voxel-ray-tracer.md
  post/                 ← blog posts
    index.json
    hello-world.md
```

Each `.md` file starts with a frontmatter block, then the body:

```
---
title: Voxel Game
publishDate: 2025-10-15      # controls ordering (newest first)
featured: true              # projects only: show on the home page
description: "A one-line summary shown on cards."
tags: [OpenGL, C#, Voxels]
img: voxel-game.png         # optional, labels the image placeholder
repo: https://github.com/…  # optional, adds a "source code" link
---

Body in **Markdown**. Headings (`##`, `###`), lists, links, `code`,
fenced code blocks (```` ```lang ````), and images
(`![alt](render:filename.png)` draws a labelled placeholder).
```

**To add a project or post:** drop a new `.md` file in the right folder,
then add its filename to that folder's `index.json`. Refresh — it's live.
(The `index.json` is needed because a static host can't list a folder's
contents; it's the one line of bookkeeping per file.)

## Notes

- **Why `.nojekyll`?** It tells GitHub Pages to skip Jekyll processing and
  serve the files untouched. Keep it.
- **How the app runs:** the source lives in `scripts/*.jsx` and is compiled
  **in the browser by Babel** (loaded in `index.html`). The `.jsx` files are
  the source of truth — edit one and refresh, no build step. `scripts/*.js`
  (data, markdown renderer, content loader) are plain JavaScript loaded as-is.
- **Markdown loading:** `scripts/content-loader.js` fetches the `.md` files at
  runtime and parses their frontmatter. This needs files served over HTTP —
  fine on GitHub Pages, but use a local server (below), never `file://`.

## Local preview

Open `index.html` through a tiny static server (not `file://`, which blocks
the module loads):

```
python3 -m http.server
# then open http://localhost:8000
```
