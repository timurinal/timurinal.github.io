---
title: Voxel Game
publishDate: 2025-10-15 09:49:00
img: /assets/projects/voxel-game.png
img_alt: A screenshot of a voxel environment with a sun in the background.
description: |
  My best attempt at a voxel game.
tags:
  - Dev
  - OpenGL
  - C#
---

Like many developers, I’ve attempted a Minecraft recreation at some point — it was also one of the first things I built while learning OpenGL.

It features an advanced texture loader that allows me to define blocks in a JSON file with unique textures on each face, but where the block manager will select different texture IDs to prevent unnecessary texture duplicates. Combined with vertex compression - packing each vertex into a single 32-bit integer, an 87.5% decrease in per-vertex size—keeps the VRAM usage very low.

Additionally, I added chunk saving and loading, which not only keeps voxel interactions persistent, but it also speeds terrain generation up as chunks don't need to be re-generated every time they are spawned and can just be loaded from a file. However, an issue I faced with this was the size of the chunk's save file being too large. At 128kB per chunk, it added up quickly, even though some chunks were entirely the same voxel type and could be stored in just 8 bytes. To solve this, I implemented a [custom RLE (run-length encoding)](https://github.com/timurinal/rle-compression) compression algorithm that massively reduced the size of the save file. This worked especially well given that voxels were stored in an array, allowing it to easily be compressed. I do plan on adding more compression, through the use of a voxel palette, a method of reducing the size of a single voxel in memory by trying to find the minimum number of bits needed to represent each voxel.

I also added some lighting effects, with one I've wanted to add for a while; volumetric lighting. Now I don't have enough knowledge of lighting to implement a full version, but I was able to very quickly implement screen-space volumetrics. This has some tradeoffs like it only having light shafts visible only when the sun is visible on screen, but it adds a lot to the atmosphere.

This is something I'm still working on, but I'm happy with the results so far. Although I have been focusing on another similar project being my voxel ray tracer, I plan on carrying on development on this project.