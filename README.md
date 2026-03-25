
# Lazyload

A lightweight JavaScript utility built on top of the **IntersectionObserver API** to lazily:

- 🖼️ Load images
- 🎥 Load videos
- ⚙️ Execute functions

Only when the target element enters the viewport.

*This is a vanilla JavaScript utility. It can be used in **React** / **Next.js** and other frameworks as well, also have **TypeScript** support. Follow the documentation below for more details.*

Lazyload defers loading of **images** and **videos**, and delays **execution of functions** on long web pages until they enter the viewport. Resources outside the visible area are not loaded or executed until the user scrolls to them, **improving performance and reducing unnecessary network usage**. This behavior is the opposite of preloading.

This is a modern, dependency-free vanilla JavaScript utility built on top of the **Intersection Observer API**. It observes when target elements enter the browser’s viewport and then dynamically loads images, loads videos, or executes functions exactly once.  Modern browser APIs and best practices are followed to ensure efficiency, simplicity, and flexibility.

▼

## Features

- Lazy load images and videos
- Execute functions on viewport entry
- Configurable viewport, margins, and thresholds
- Zero dependencies

▼

## Documentation

### Check out the [Documentation ➢](https://bitlaablazyload.web.app)