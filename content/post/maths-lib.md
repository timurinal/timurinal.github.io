---
title: HLSL-like Maths Library
slug: hello-world
publishDate: 2026-06-05
description: A C# maths library based on HLSL's maths library
tags: [HLSL, C#, Maths]
---
I do a lot of shader programming, and despite the differences between HLSL and GLSL, they share very similar maths libraries, which means every time I touch C# annd have to do anything with maths, it throws me having to be more explicit about values.

For example,
```hlsl
float3 myFloat3 = float3(1.0);
float2 texcoord = myFloat3.xz;
```

Becomes
```csharp
using System.Numerics;
Vector3 myFloat3 = new Vector3(1.0);
Vector2 texcoord = new Vector2(myFloat3.X, myFloat3.Z);
```

Now, I had recently started learning how to use Unity's Burst compiler and Jobs system, and it implements a maths library that intentionally behaves very similar to HLSL. That's what inspired this project, in which I set out to create a maths library that mimics HLSL's as closely as possible.

In my library, that same C# snippet becomes the following:
```csharp
using SLML;
using static SLML.HLSL;

float3 myFloat3 = float3(1.0);
float2 texcoord = myFloat3.xz;
```

This is far closer to HLSL's, and my library supports **every** single swizzle combination, and implements every HLSL maths struct and function. It also implements a few extras, like `Ray`, `Box2D`, `Box3D`, and more.

One of my biggest goals with this library was performance, and since I have very little SIMD experience, I decided to wrap the `System.Numerics` objects instead. Under the hood, my `float3` is ultimately just this with some extra getters/setters:
```csharp
public struct float3 {
	private System.Numerics.Vector3 vec;

	public float x { get => vec.X; set => vec.X = value; }
}
```

I do plan on polishing it and releasing it as a full library, but there's still a lot of work to be done with it.