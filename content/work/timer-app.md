---
title: Timer App
slug: timer-app
publishDate: 2023-10-16
featured: false
description: A remotely-controllable countdown timer built for a live-streaming company — realtime messages, server browser, brandable UI.
tags: [Unity, C#, Networking]
img: timer-app-screenshot.png
img_alt: A screenshot of the timer app.
---

[BeamOut Studios](https://www.beamoutstudios.co.uk), an event live-streaming company, asked me to build a remotely-controllable countdown timer for their events — to keep speakers inside their slot. Existing apps were either inflexible, missing features, or paywalled. I built it in Unity for the responsive UI and easy networking.

### Objectives
- Clean and simple, customisable with branding and colours
- Live-updating event name on the UI
- A colour-changing timer: green above 5 min, orange under 5 min, red under 60 s
- Realtime popup messages to the speaker
- A server browser so users avoid fiddling with IP addresses
- Tightly optimised, so it never lags hardware or the network

### Challenges
Unity's built-in networking (Netcode for GameObjects) made it hard to send variable-size types like strings — you're stuck with fixed-size primitives. I switched to [Mirror Networking](https://mirror-networking.com/), which made sending any type, including custom classes and structs, far easier.

A really fun project that sharpened my networking and UI-design skills.
