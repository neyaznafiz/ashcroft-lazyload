
# Lazyload

A lightweight JavaScript utility built on top of the **IntersectionObserver API** to lazily:

- 🖼️ Load images
- 🎥 Load videos
- ⚙️ Execute functions

Only when the target element enters the viewport.

Lazyload defers loading of **images** and **videos**, and delays **execution of functions** on long web pages until they enter the viewport. Resources outside the visible area are not loaded or executed until the user scrolls to them, **improving performance and reducing unnecessary network usage**. This behavior is the opposite of preloading.

This is a modern, dependency-free vanilla JavaScript utility built on top of the **Intersection Observer API**. It observes when target elements enter the browser’s viewport and then dynamically loads images, loads videos, or executes functions exactly once.  Modern browser APIs and best practices are followed to ensure efficiency, simplicity, and flexibility.

▼

## Features

- Lazy load images and videos
- Execute functions on viewport entry
- Configurable viewport, margins, and thresholds
- Zero dependencies

▼

## 📦 Installation

```bash
npm install @bitlaab/lazyload@latest
```
Or
```bash
yarn add @bitlaab/lazyload@latest
```
```js
import { Lazyload } from "@bitlaab/lazyload";
```

Or import directly using **CDN**
```js
import { Lazyload } from "https://cdn.jsdelivr.net/npm/@bitlaab/lazyload@1.0.5/module.js";
```

▼

## Global Methods

| Method    | Description |
|-----------|------------------|
| media()   | Load images and videos when element will enter into the viewport. |
| execute() | Execute function when element will enter into the viewport. |

▼

## 🖼️ 🎥 media()
It will load **images** and **videos** when item will enter into the viewport. the method accept 5 parameters of object:
- **wrapper:** (Optional) - The wrapper of the `srcTarget`. The value of it is `CSS Selector`.  
**e.g.,** `wrapper: "#item-wrapper"`  
**Note:** If you don't provide the `wrapper` it will select all of the elements with the selector of `srcTarget` from `DOM`, otherwise it will select only from the `wrapper`. You can handle it on your needs.

- **srcTarget:** (Required) - The selector of the elements where the image `src` will be set. The value of it is `CSS Selector`.  
**e.g.,** `srcTarget: ".lazy-item"`

- **lazyUrls:** (Optional) - An array of string(image or video url).  
**e.g.,** `lazyUrls: [ "/image.jpg", "/video.mp4"]`

- **attr:** (Optional) - An attribute where image url will be set. If you use this parameter, the image url will be set into this attribute of the `srcTarget` element, otherwise it will set `src` attribute with the image url into the `srcTarget` element by default.  
**e.g.,** `attr: "data-xyz"`.  
**result** `<img data-xyz="/image.jpg" />`

- **options:** (Optional) - The configuration of the lazyload. **Most of the time you don't need to use it, the package internally handle it. Only use, when you want manual control.** the value of it is an `object` with 3 properties and all are optional.  
**e.g.,** `options: {root: null, loadBefore: 0, loadAfter: 0}`

### YOU CAN LOAD MEDIA IN TWO WAYS:

### First Example
Setting the `media url` into an attribute called `data-lazy-url`

```html
<div id="item-wrapper">
    <img class="lazy-item" data-lazy-url="/image.jpg"/>
    <video class="lazy-item" data-lazy-url="/video.mp4"></video>
</div>
```

```js
const lazyload = new Lazyload();

lazyload.media({
    wrapper: "#item-wrapper",
    srcTarget: ".lazy-item",
});
```

### Second Example
Passing `lazyUrls: []`(Array of images or videos urls) parameter of the `lazyload.media()` function.

```html
<div id="item-wrapper">
    <img class="lazy-item"/>
    <video class="lazy-item"></video>
</div>
```

```js
const lazyload = new Lazyload();

lazyload.media({
    wrapper: "#item-wrapper",
    srcTarget: ".lazy-item",
    lazyUrls: ["/image.jpg", "/video.mp4"],
});
```

▼

## ⚙️ execute()
It will execute function when `viewportEntry` element will enter into the viewport. the method accept 3 parameters:

- **viewportEntry:** (Required) - The `viewportEntry` is the element where will be the function call, when the element enter into the viewport the function will be called. The value of it is `CSS Selector`.  
**e.g.,** `viewportEntry: "#stats"`

- **exeFn:** (Required) - The value of this parameter is a `function()` which will be execute.  
**e.g.,** `exeFn: () = {};`

- **options:** (Optional) - The configuration of the lazyload. **Most of the time you don't need to use it, the package internally handle it. Only use, when you want manual control.** the value of it is an `object` with 3 properties and all are optional.  
**e.g.,** `options: {root: null, loadBefore: 0, loadAfter: 0}`

### Example

```html
<div id="stats">
    <h1 class="title"></h1>
</div>
```

```js
async function fetchPosts() {
    const url = "https://jsonplaceholder.typicode.com/posts"
    const resp = await fetch(url);
    const arr = await resp.json();

    document.querySelector(".title").textContent = arr[0]
}

// ---------------------------------------------------------------------

const lazyload = new Lazyload();

lazyload.execute({
    viewportEntry: "#stats",
    exeFn: fetchPosts,
});
```

▼

## Global Options
**Most of the time you don't need to use it, the package internally handle those options.**  
**Only use, when you want manual control.**

```js
options: {
    root: null,
    loadBefore: 0,
    loadAfter: 0
}
```

| Option | Type | Description |
|------|------|------------|
| root | string \| null | Viewport container selector |
| loadBefore | number | Margin before entering viewport |
| loadAfter | number | Visibility ratio (0–1) |

#### Example

```js
lazyload.media({
    wrapper: "...",
    srcTarget: "...",
    options: {root: "...", loadBefore: 100, loadAfter: 0}
});

// or

lazyload.execute({
    viewportEntry: "...",
    exeFn: () => {},
    options: {root: "...", loadBefore: 0, loadAfter: 0.8}
});
```

▼

## 📄 License

**MIT**

---

### Bitlaab's Open Source

Here are some open-source things — Powered by Bitlaab — built with the aim of simplifying technology, enhancing the developer experience, encouraging collaboration, and giving back to the developer community. Everything we build is from our passion for clean code, well-crafted engineering, and a culture of open contribution.

Whether you’re here to learn, use, or contribute — dive in and discover how open source at Bitlaab is helping shape a better tech ecosystem for our fellow programmers and developers.

Checkout our open source:  
[Bitlaab Blitz](https://github.com/bitlaab-blitz)  
[Bitlaab Bolt](https://github.com/bitlaab-bolt)

Thank you for taking the time to explore our open-source projects. Your interest, support, and contributions mean a lot to us and help drive our mission of building better, more open technology for the developer community.

**Best Regards**  
**[www.bitlaab.com](https://bitlaab.com)**