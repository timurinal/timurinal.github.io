---
title: Timer App
publishDate: 2023-10-16 17:59:38
img: /assets/projects/timer-app-screenshot.png
img_alt: A screenshot of the timer app.
description: |
  A remotely controlled timer app made for the live streaming company, BeamOut Studios.
tags:
  - Dev
  - Unity
  - C#
---

I was asked by [BeamOut Studios](https://www.beamoutstudios.co.uk), an event live-streaming company, to create a remote-controllable timer that they can use in their events.

For certain events they live-streamed, a countdown timer that could be controlled in realtime, remotely, was needed to ensure that speakers stuck to their speaking slot. Most of the apps that already existed at the time were either missing customisability, were lacking in features, or locked a lot of the features behind a paywall. Although it isn't the most efficient, I made the app in Unity as it allowed me to easily create a responsive UI and implement networking.


**Project Objectives:**


- Something clean and simple that could be customised with branding, specific colours, etc
- The ability to add the event name to the UI that updated in realtime
- Colour changing timer that turns green at more than 5 minutes, orange at less than 5 minutes, and red at less than 60 seconds
- The ability to send realtime popup messages to send to the speaker.
- Server browser so that users didn't have to mess around with IP addresses for connecting
- Ensuring the app was as optimised as possible to not affect the network in any way and that the app didn't lag any hardware


**Some challenges I faced while making the app were:**



- Unity's provided networking API (Netcode for GameObjects) made it very difficult to send non-fixed size data types like strings as you have to use fixed size, C# builtin, data types like bools, integers, floats, etc
- I was able to find a better networking system called [Mirror Networking](https://mirror-networking.com/) that was far easier to use than Netcode and allowed sending of any data type including custom classes and structs

This was a really fun project to work on and was very useful for improving my knowledge of networking, and UI design.

At the minute, the app isn't available for public use; however, this might change in the future!