---
title: Voxel Game
slug: voxel-game
publishDate: 2025-10-15
featured: true
description: A Minecraft-style voxel engine with 32-bit packed vertices, custom RLE chunk compression and screen-space volumetric lighting.
tags: [OpenGL, C#, Voxels]
img: voxel-game.png
img_alt: A voxel environment with a sun in the background.
---

Like many developers, I've attempted a Minecraft recreation at some point — it was also one of the first things I built while learning OpenGL.

It features an advanced texture loader that lets me define blocks in a JSON file with unique textures per face, while the block manager reuses texture IDs to avoid duplicates. Combined with **vertex compression** — packing each vertex into a single 32-bit integer, an **87.5% drop** in per-vertex size — VRAM usage stays very low.

### Chunk saving & a size problem
I added chunk saving and loading, which keeps voxel interactions persistent *and* speeds up terrain generation, since chunks load from disk instead of regenerating. The catch: chunk save files were huge. At **128 kB per chunk** it added up fast — even chunks that were entirely one voxel type and could fit in 8 bytes.

To fix it I wrote a [custom RLE (run-length encoding) compressor](https://github.com/timurinal/rle-compression) that dramatically shrank the save files. It works especially well because voxels live in an array. Next I plan to add a **voxel palette** — finding the minimum bits needed to represent each voxel.

### Volumetric lighting
I also added a lighting effect I'd wanted for a while: **screen-space volumetrics**. It has tradeoffs — light shafts only appear when the sun is on screen — but it adds a lot of atmosphere.

![A voxel landscape lit by a low sun with visible light shafts](render:voxel-game.png)

This is still in progress, but I'm happy with where it's at.
