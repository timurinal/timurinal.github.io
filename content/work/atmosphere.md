---
title: Atmospheric Scattering
slug: atmosphere
publishDate: 2024-04-27
featured: false
description: "A physically-based atmosphere for a space game — ray-marched scattering that holds up from orbit and from the planet's surface."
tags: [GPU, Unity, HLSL]
img: atmosphere-2.png
img_alt: A rendered atmosphere around an Earth-like planet, seen from a moon.
---

I'd been building a space game in Unity, and for planets I wanted a realistic atmosphere. Most implementations only looked good from afar — but my planets are traversable, so the atmosphere had to hold up from the surface too.

Rendered as a post-process, it simulates light rays travelling from the camera into the atmosphere, calculating how light bounces toward the sun and interacts with aerosol molecules.

### Optimisation
I used the built-in render pipeline — it's much easier to write image effects there than in URP or HDRP. The big win was **precomputing molecule density** at every point in the atmosphere and storing it in a texture, so the shader skips expensive per-frame density calculations.

### Still to do
I want stars that react to the atmosphere (fading out during the day), and to fix rendering over transparent geometry — transparent objects aren't in the depth texture, so I'll likely add a second camera that renders depth for them.

Hugely helpful: NVIDIA's [GPU Gems chapter](https://developer.nvidia.com/gpugems/gpugems2/part-ii-shading-lighting-and-shadows/chapter-16-accurate-atmospheric-scattering) on accurate atmospheric scattering, and a [Sebastian Lague video](https://www.youtube.com/watch?v=DxfEbulyFcY) for the Unity-specific parts.

![Atmosphere rendered from the planet surface at sunset](render:atmosphere-1.png)
