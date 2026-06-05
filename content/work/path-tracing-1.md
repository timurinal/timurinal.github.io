---
title: Path Tracing
slug: path-tracing-1
publishDate: 2024-04-27
featured: false
description: "My first GPU path tracer in Unity + HLSL: multiple lights, soft shadows, custom meshes, emissive materials and a frame-averaging denoiser."
tags: [GPU, Unity, HLSL]
img: path-tracer/5.png
img_alt: Two spheres with a sun in the distance.
repo: https://github.com/timurinal/Path-Tracing/
---

After learning shaders in Unity and building a [realtime atmospheric scattering simulation](#/projects/atmosphere), I had enough ray-marching knowledge to attempt my own path tracer. I'd made a ray tracer before, but shadows were harsh, reflections looked off, and there was no triangle support. This one is much better:

- Multiple lights
- Soft shadows (a side effect of how light accumulates)
- Support for custom meshes
- Skybox for environment detail
- Specular and diffuse reflections
- Emissive materials

The denoiser averages each frame with the previous one to cut down noise where rays never hit a light. I'm working on a better one with blurring and edge detection to re-sharpen shapes.

### Performance
It isn't the most performant, but it renders simple scenes quickly. In testing I got ~15 FPS with 6 spheres and no triangles, and a fairly denoised image after ~15 minutes (the bulk of the noise clears in about a minute). A more complex scene — 6 quads, 4 spheres — took about 2 hours to fully clean up.

The source is [on my GitHub](https://github.com/timurinal/Path-Tracing/). My [second attempt](#/projects/path-tracing-2) is a massive improvement, so check that out too.
