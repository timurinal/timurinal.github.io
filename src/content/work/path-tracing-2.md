---
title: Path Tracing v2
publishDate: 2025-01-18 16:21:20
img: /assets/projects/path-tracer-2/project-2.png
img_alt: An image of two spheres with a sun in the distance.
description: |
  My second attempt at a path tracer.
tags:
  - Dev
  - GPU
  - Unity
---

Since my last attempt at a path tracer, I've been working on a new one that is much more efficient and features a more advanced denoiser, to produce more realistic scenes.

Since then, I've learnt a lot more about lighting techniques, and have been able to improve several aspects of the path tracer. Some of the improvements include:
- Bilateral denoiser
- More efficient object culling
- Additional mathematical primitives
- HDRIs
- Early ray termination
- Timeline rendering
- And several other performance improvements

### Bilateral Denoiser

This was my best advancement so far. It uses a bilateral filter to denoise the image, which - when coupled with the temporal denoiser - can produce much clearer results in a shorter amount of time. The purpose of using a bilateral filter is to detect noise and remove it by repeatedly blurring it. This is done by comparing the current pixel to surrounding pixels and applying a blur only in the directions that pixels are considered "similar".

This did have the downside of blurring fine details that were mistaken for noise, but with enough configuring it was able to effectively differentiate between noise and fine details, and produce very clear images.


### Object Culling

A simple optimisation I never added to my previous path tracer was object culling. This is done via a simple [AABB](https://en.wikipedia.org/wiki/AABB) test, which checks if the ray intersects a bounding box around the object at any point. If it does, the ray can continue to be traced, allowing for computational power for triangle calculations to be focused on pixels that will actually see those triangles.


### Additional Mathematical Primitives

Yet another simple optimisation. Cubes and cuboids, regardless of rotation, can be expressed as a min, max, and a model matrix. This allows for simple mathematical AABB tests to be performed on the cube, which can be used to skip the triangle calculations entirely. This massively sped up scenes that were otherwise computationally expensive due to them having many cubes which did not need triangle tests.


### HDRIs

One of my favourite features of this new path tracer is the ability to use HDRIs. This allows for realistic skyboxes to be applied, which can be used to create a more realistic environment. Rays, if they miss any object, will "hit" the skybox and sample it's HDRI, which added some appealing ambient lighting due to the HDRIs having a much higher colour range compared to my simple procedural skybox.

![HDRI](/assets/projects/path-tracer-2/1.png)
![HDRI](/assets/projects/path-tracer-2/2.png)


### Early Ray Termination

This was a feature I begun adding to my first path tracer, but never got working. Rays that have their incoming light drop below 0 (fully black) means they will no longer contribute any light to the scene, which means they can be terminated early, saving several bounces.


### Timeline Rendering

Yet another one of my favourite features. I added the ability to use Unity's Timeline system to create animations in the scene and for the path tracer to render them into a video. This was a fun feature to add, and meant I could create short videos of my path tracer in action. It did take a long time to render, although improvements can be made to the path tracer to make it more efficient.

---

I plan on adding more features, as well as focusing on improving performance. The code currently is not on GitHub, but once I refactor parts of the codebase to make it nicer to work with, I will be posting it there.
