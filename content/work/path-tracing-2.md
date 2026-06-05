---
title: Path Tracing (again)
slug: path-tracing-2
publishDate: 2025-01-18
featured: true
description: A second, far more efficient GPU path tracer — bilateral denoiser, HDRIs, early ray termination and Timeline-driven video rendering.
tags: [GPU, Unity, HLSL]
img: path-tracer-2/project-2.png
img_alt: Two spheres with a sun in the distance.
---

Since my last attempt at a path tracer, I've built a new one that's much more efficient with a more advanced denoiser, producing more realistic scenes. Some of the improvements:

- Bilateral denoiser
- More efficient object culling
- Additional mathematical primitives
- HDRIs
- Early ray termination
- Timeline rendering

### Bilateral denoiser
My best advancement so far. A bilateral filter detects noise and removes it by repeatedly blurring — comparing each pixel to its neighbours and only blurring in directions where pixels are "similar". Coupled with the temporal denoiser it produces much clearer results, far faster. The downside was blurring fine detail mistaken for noise, but with enough tuning it tells them apart well.

### Object culling
A simple optimisation I never added before: an [AABB](https://en.wikipedia.org/wiki/AABB) test that checks if a ray intersects a bounding box before tracing triangles inside it — focusing compute on pixels that actually see geometry.

### HDRIs
One of my favourite features. Rays that miss everything "hit" the skybox and sample its HDRI, giving appealing ambient lighting thanks to the HDRI's much higher colour range.

![A path-traced scene lit by an HDRI](render:path-tracer-2/1.png)

### Timeline rendering
I added the ability to use Unity's Timeline system to animate a scene and render it to video — so I could make short clips of the tracer in action. Rendering is slow, but there's lots of room to optimise.
