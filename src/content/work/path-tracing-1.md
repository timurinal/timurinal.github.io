---
title: Path Tracing
publishDate: 2024-04-27 14:43:22
img: /assets/projects/path-tracer/5.png
img_alt: An image of two spheres with a sun in the distance.
description: |
  A path tracer written in C# and HLSL
tags:
  - Dev
  - GPU
  - Unity
---

Recently, I've been learning shaders in Unity and I made a [realtime atmospheric scattering simulation](/atmosphere) and that used ray marching to simulate all the little light interactions. With this new knowledge of shaders and ray marching, I wanted to attempt to make my own path tracer in Unity! I've actually made a ray tracer before, following [this](https://www.gamedeveloper.com/programming/gpu-ray-tracing-in-unity-part-1) guide. It was great for learning about ray tracers, and it was very fast, but it didn't produce the best results. Shadows were very harsh, reflections looked 'off', and biggest of all, there wasn't support for triangles. This new path tracer I made is much better and has many new features like:

*   Multiple lights
*   Soft shadows (this was actually a side effect of how the light is accumulated)
*   Support for custom meshes
*   Skybox to add detail to the environment
*   Specular and diffuse reflections
*   Emissive materials

I've still got loads to add like, normal mapping, and texture mapping, but it is already capable of rendering realistic scenes with only a short wait for the denoiser.  
The denoiser that the path tracer uses is a custom denoiser that averages the frame out with the previous frame to help reduce noise where rays didn't hit a light at all so no light could be added to that pixel. I am working on a better denoiser that blurs the image and does some edge detection to work out where shapes are to re-sharpen the blurred frame but that is still very incomplete. I also need to optimise the triangle intersection testing as even a few triangles is enough to completely kill your framerate.

It isn't the most performant by any means but is able to quickly render (simple) scenes. During testing, I was able to render about 15 FPS (frames per second) with 6 spheres and no triangles, and I was able to get a relatively denoised picture after about 15 minutes, but the initial bulk of the noise disappears after about a minute. With a slightly more complex scene (about 6 quads and 4 spheres), I was able to get a denoised image after about 2 hours.

The source code is available on my [GitHub](https://github.com/timurinal/Path-Tracing/) as a Unity project if you want to check it out, although the code is very messy, given that it was written in a compute shader and not in a fragment shader. My [second attempt](/work/path-tracing-2) at a path tracer is a massive improvement over this one, so be sure to check that out!

### Images

![A scene with 4 spheres of varying reflectiveness and smoothness](/assets/projects/path-tracer/3.png)
![A scene with 4 spheres being lit from a large light above](/assets/projects/path-tracer/4.png)



My initial attempt at a ray tracer

![](/assets/projects/path-tracer/old-path-tracer.png)