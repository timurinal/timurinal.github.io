---
title: OpenLink
publishDate: 2025-09-12 01:33:05
img: /assets/projects/openlink.png
img_alt: An image of a rendered atmosphere surrounding an Earth-like planet visible from the surface of a moon.
description: |
  Cross-platform system for creating a device ecosystem, allowing for seamless connection and communication of devices of different brands, operating systems, and versions. 
tags:
  - Dev
  - Networking
  - C++
---

An issue I have always had with technology is having the ability to connect multiple devices seamlessly, but **only** if they are of the same brand or of "compatible" operating systems. For example, I have a Samsung Phone, Windows laptop, and a PC running Arch Linux. There is no simple way for me to connect all of these devices together to get things like file sharing, shared notifications, or even more advanced features like screen mirroring. There are apps like KDE Connect which are great, but I've never been able to get it to work with my setup, as I don't use KDE Plasma, so none of the dependencies are there that are needed.

This is where OpenLink comes in, my newest and most ambitious project yet. It is a cross-platform "engine" for creating custom device ecosystems, allowing you to connect any device to any other device that you own. I am designing it to "just work", with no need to set up any additional packages or dependencies.

This kind of app will aim to reduce the need to feel like you are confined to one brand's ecosystem, and improve workflow and productivity without the need to configure several apps/software to get a fraction of the functionality.

It'll be extremely customisable, with a modular design allowing features to be added or removed as needed. The modular design will also allow people to create their own modules for specific features or add support for Iot devices. This architecture will also allow for very fine control, as unwanted features can be removed easily. For example, clipboard sharing will be a module, but if that is a feature that isn't useful, it can just be disabled not to take up space or bandwidth.


### Features

- File sharing
- Screen mirroring
- Shared notifications
- Clipboard sharing

It is currently in very, very early development, but progress can be tracked on [GitHub](https://github.com/timurinal/openlink) or on the project's [website](https://openlink.timurinal.co.uk).