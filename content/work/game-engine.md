---
title: Game Engine
slug: game-engine
publishDate: 2024-11-30
featured: false
description: My first real game engine, in C++ and OpenGL — a dynamic ECS, scene hierarchy with parent/child transforms, and an editor UI in Dear ImGui.
tags: [C++, OpenGL, ECS]
img: game-engine.png
img_alt: A game engine editor showing a box and a light source.
---

Using my C++ voxel game as a springboard, I set out to build a proper engine. Despite getting burnt out on it, it actually started to look like a passable game engine.

### What it had
- A full **dynamic ECS** (entity-component-system)
- A scene **hierarchy** with parent/child transform architecture
- An editor UI built with **Dear ImGui**
- An OpenGL renderer with basic lighting

### Where it's going
I haven't continued with this version, but I want to start a fresh one with a much cleaner, more modular codebase. Unlike this engine, the next one will **prioritise voxel games** - with a built-in ray tracer *or* greedy mesher for rendering voxels, since I seem to just love voxels.

It's an ambitious goal, but - just like this engine - I'll pick up a lot of useful experience along the way.
