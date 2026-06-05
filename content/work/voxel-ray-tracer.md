---
title: Voxel Ray Tracer
slug: voxel-ray-tracer
publishDate: 2025-11-04
featured: true
description: A ray-traced voxel renderer storing the world in a 3D texture for fast random reads — LabPBR-compliant, with normal & parallax mapping.
tags: [GPU, OpenGL, C#]
img: voxel-ray-tracer.png
img_alt: A voxel environment with two pillars of voxels casting shadows.
---

After making my [voxel game](#/projects/voxel-game), I wanted to make a ray-traced version of it, mainly to experiment with lighting.

I started with a simple DDA implementation (generating voxels on the GPU), and once that worked I switched to CPU-generated voxels, allowing more complex terrain. Previously I'd store all objects in a GPU buffer, which worked, but a lot of overhead came from buffers not liking random reads — the driver has to shuffle data between VRAM and the GPU cache.

### The buffer problem
GPUs prefetch neighbours around an indexed value to speed up linear reads. That backfires here: voxel positions are flattened into a 1D array, so reads are anything but linear. I had two options — sort voxels by distance from the camera, or use a data structure built for random reads: **textures**.

GPUs are heavily optimised for random texture reads, so I store the voxel data in a **3D texture**, where `0` is air and any value below `255` is a voxel. This massively sped up the renderer and gave a cleaner path for uploading voxels to the GPU.

### Lighting
Once I had a ray-collision function, adding shadows and specular reflection was straightforward. Since I was using a Minecraft PBR resource pack, I made the tracer **LabPBR compliant** and added normal mapping per their spec.

I also attempted parallax mapping — I was disappointed with the first results, but I'm working on a new ray-marched method for much better depth.

![Two voxel pillars casting hard ray-traced shadows](render:voxel-ray-tracer.png)
