---
title: Atmospheric Scattering
publishDate: 2024-04-27 14:43:22
img: /assets/projects/atmosphere-2.png
img_alt: An image of a rendered atmosphere surrounding an Earth-like planet visible from the surface of a moon.
description: |
  A path tracer written in C# and HLSL
tags:
  - Dev
  - GPU
  - Unity
---

I've been working on a space game in the Unity Engine, and for planets I wanted a realistic atmosphere. Most of the ones I'd found before only looked good from afar, but planets are traversable, so the atmosphere had to look good on the planet surface. The way this effect, which is rendered as a post-processing effect, works is by simulating light rays going from the camera into the atmosphere and calculating how it bounces around into the sun and how the light interacts with aerosol molecules in the atmosphere.

I used the builtin render pipeline as it's much easier to create image effects than in the universal RP or HDRP. One of the optimisations that massively helped performance was precomputing the density of molecules at every point in the atmosphere and storing it in a texture so the shader wouldn't need to do any expensive calculations to figure out the density of molecules in the atmosphere every frame.

I've still got some things I want to add, like stars that react to the atmosphere so they fade out during the day. I also have a few issues that need fixing that should improve the look of the atmosphere, like where it gets rendered over transparent geometry as transparent objects aren't included in the depth texture, however, I think I can set up a second camera with the purpose of rendering a depth texture for transparent geometry.

A really helpful paper was [this](https://developer.nvidia.com/gpugems/gpugems2/part-ii-shading-lighting-and-shadows/chapter-16-accurate-atmospheric-scattering) paper by NVIDIA on accurate atmospheric scattering for realtime games.  
Another helpful resource was [this](https://www.youtube.com/watch?v=DxfEbulyFcY) video by Sebastian Lague which really helped with some of the more Unity-specific issues that the paper didn't cover.

### Images

![](/assets/projects/atmosphere-1.png)
![](/assets/projects/atmosphere-5.png)