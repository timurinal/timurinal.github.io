---
title: Voxel Ray Tracer
publishDate: 2025-11-04 15:27:43
img: /assets/projects/voxel-ray-tracer.png
img_alt: A screenshot of a voxel environment with two pillars of voxels casting shadows.
description: |
  My best attempt at a voxel game.
tags:
  - Dev
  - OpenGL
  - C#
---

After making my [voxel game](/work/voxel-game), I wanted to make a ray-traced version of it, mainly to experiment with lighting.

I started with a simple DDA implementation (using a function on the GPU to generate voxels), and once I had that working, I switched to using CPU-generated voxels, allowing me to generate more complex terrain. Previously when making ray tracers, I would store all objects in a GPU buffer, which worked somewhat well, but a lot of overhead came from buffers not liking random reads. This is caused by the driver having to move data between the VRAM and GPU cache. 

A common optimisation done by the GPU driver is to move elements around an indexed value in a buffer to the cache as well to reduce overhead when doing linear reads. This works well for most cases, but in this case it tripped me up since the voxel data is not stored in a structured or organised way that the GPU understands; voxel positions are flattened into a 1D array. To fix this overhead, I had two options: either sort the voxels by position from the camera to optimise reads and put nearby voxels as close to each other as possible, or use a data structure designed for random reads: textures. GPUs are highly optimised for random texture reads and non-linear reads, so I decided to store the voxel data in a 3D texture, where 0 was air and any integer value less than 255 was a voxel. This massively sped up the renderer and also allowed for a slightly cleaner method for sending the voxels to the GPU.

Once I had a ray collision function, adding more complex lighting like shadows and specular reflection was fairly straightforward.

Since I was using a resource pack from a Minecraft PBR pack, I thought I should try and make my ray tracer LabPBR complient, and added normal mapping using their defined method. I also attempted to add parallax mapping, but I was disappointed with the results, but I am working on a new method using some ray marching to get much better results.