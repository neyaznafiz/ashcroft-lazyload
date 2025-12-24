
# Lazyload

A lightweight JavaScript utility built on top of the **IntersectionObserver API** to lazily:

- 🖼️ Load images
- 🎥 Load videos
- ⚙️ Execute functions

Only when the target element enters the viewport.

Lazyload defers loading of **images** and **videos**, and delays **execution of functions** on long web pages until they enter the viewport. Resources outside the visible area are not loaded or executed until the user scrolls to them, **improving performance and reducing unnecessary network usage**. This behavior is the opposite of preloading.

This is a modern, dependency-free vanilla JavaScript utility built on top of the **Intersection Observer API**. It observes when target elements enter the browser’s viewport and then dynamically loads images, loads videos, or executes functions exactly once.  Modern browser APIs and best practices are followed to ensure efficiency, simplicity, and flexibility.

---

## Features

- Lazy load images and videos
- Execute functions on viewport entry
- Configurable viewport, margins, and thresholds
- Zero dependencies

---

## 📦 Installation

```bash
npm install @ashcroft/lazyload@latest
```

or

```bash
yarn add @ashcroft/lazyload@latest
```

---

## Getting Started

```js
import Lazyload from "@ashcroft/lazyload";
// or
const Lazyload = require("@ashcroft/lazyload");

const lazy = new Lazyload();
```

---

## Global Options
**Most of the time you don't need this, the package internally handle it. Only use when you want manual control.**

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

---

## 🖼️ loadImage()
It will load images when item will enter into the viewport. the method accept 5 parameters:
- **wrapper:** (Optional) - The `wrapper` of the `srcTarget`. The value of it is `CSS Selector`. </br>
**e.g.,** `wrapper: "#image-wrapper"` </br> **Note:** If you don't provide the `wrapper` it will select all of the elements with the selector of `srcTarget` from `DOM`, otherwise it will select only from the `wrapper`. You can handle it on your needs.

- **srcTarget:** (Required) - The `srcTarget` is the selector of the elements where the image `src` will be set. The value of it is `CSS Selector`. </br>
**e.g.,** `srcTarget: ".lazy-img"`

- **attr:** (Optional) - The `attr` is the attribute where image url will be set. If you use this parameter, the image url will be set into this attribute of the `srcTarget` element, otherwise it will set `src` attribute with the image url into the `srcTarget` element by default. </br>
**e.g.,** `attr: "data-image"` </br>
**result** `<img data-image="/images/demo-1.jpg" />`

- **images:** (Optional) - The `images` is an array of string(image url). </br>
**e.g.,** `images: [ "/images/demo-1.jpg", "/images/demo-2.jpg"]`

- **options:** (Optional) - The `options` is the configuration of the lazyload. the value of it is an `object` with 3 properties and all are optional. </br>
**e.g.,** `options: {root: null, loadBefore: 0, loadAfter: 0}`

### You can load image in two ways:

#### First Example
Setting the `image url` into an attribute called `data-url`

```html
<div id="image-wrapper">
    <img class="lazy-img" data-url="/images/demo-1.jpg" />
    <img class="lazy-img" data-url="/images/demo-2.jpg" />
</div>
```

```js
lazy.loadImage({
    wrapper: "#image-wrapper"
    srcTarget: ".lazy-img",
    options: { // Most of the time you don't need to set this parameter,
    // the package internally handle it.
    // Only use when you want manual control.
        root: null,
        loadBefore: 0,
        loadAfter: 0
    }
});
```

#### Second Example
Passing `images: []`(Array of image urls) parameter into the `loadImage()` function.

```html
<div id="image-wrapper">
    <img class="lazy-img" />
    <img class="lazy-img" />
</div>
```

```js
lazy.loadImage({
    wrapper: "#image-wrapper"
    srcTarget: ".lazy-img",
    images: ["/images/demo-1.jpg", "/images/demo-2.jpg"],
    options: { // Most of the time you don't need to set this parameter,
    // the package internally handle it.
    // Only use when you want manual control.
        root: null,
        loadBefore: 0,
        loadAfter: 0
    }
});
```

---

## 🎥 loadVideo()
It will load videos when item will enter into the viewport. the method accept 5 parameters:
- **wrapper:** (Optional) - The `wrapper` of the `srcTarget`. The value of it is `CSS Selector`. </br>
**e.g.,** `wrapper: "#image-wrapper"` </br> **Note:** If you don't provide the `wrapper` it will select all of the elements with the selector of `srcTarget` from `DOM`, otherwise it will select only from the `wrapper`. You can handle it on your needs.

- **srcTarget:** (Required) - The `srcTarget` is the selector of the elements where the video `src` will be set. The value of it is `CSS Selector`. </br>
**e.g.,** `srcTarget: ".lazy-img"`

- **attr:** (Optional) - The `attr` is the attribute where video url will be set. If you use this parameter, the video url will be set into this attribute of the `srcTarget` element, otherwise it will set `src` attribute with the video url into the `srcTarget` element by default. </br>
**e.g.,** `attr: "data-video"` </br>
**result** `<img data-video="/videos/demo-1.mp4" />`

- **videos:** (Optional) - The `videos` is an array of string(video url). </br>
**e.g.,** `videos: ["/videos/demo-1.mp4", "/videos/demo-2.mp4"]`

- **options:** (Optional) - The `options` is the configuration of the lazyload. the value of it is an `object` with 3 properties and all are optional. </br>
**e.g.,** `options: {root: null, loadBefore: 0, loadAfter: 0}`

### You can load videos in two ways:

#### First Example
Setting the `video url` into an attribute called `data-url`

```html
<div id="video-wrapper">
    <iframe
        class="lazy-video item" data-url="/videos/demo-1.mp4"
        frameborder="0" width="200" height="200"
    ></iframe>
    <iframe
        class="lazy-video item" data-url="/videos/demo-2.mp4"
        frameborder="0" width="200" height="200"
    ></iframe>
</div>
```

```js
lazy.loadVideo({
    wrapper: "#video-wrapper"
    srcTarget: ".lazy-video",
    options: { // Most of the time you don't need to set this parameter,
    // the package internally handle it.
    // Only use when you want manual control.
        root: null,
        loadBefore: 0,
        loadAfter: 0
    }
});
```

#### Second Example
Passing `videos: []`(Array of video urls) parameter into the `loadVideo()` function.

```html
<div id="video-wrapper">
    <iframe
        class="lazy-video item"
        frameborder="0" width="200" height="200"
    ></iframe>
    <iframe
        class="lazy-video item"
        frameborder="0" width="200" height="200"
    ></iframe>
</div>
```

```js
lazy.loadVideo({
    wrapper: "#image-wrapper"
    srcTarget: ".lazy-video",
    videos: ["/videos/demo-1.mp4", "/videos/demo-2.mp4"],
    options: { // Most of the time you don't need to set this parameter,
    // the package internally handle it.
    // Only use when you want manual control.
        root: null,
        loadBefore: 0,
        loadAfter: 0
    }
});
```

---

## ⚙️ executeFn()
It will execute function when `viewportEntry` element will enter into the viewport. the method accept 3 parameters:

- **viewportEntry:** (Required) - The `viewportEntry` is the element where will be the function call, when the element enter into the viewport the function will be called. The value of it is `CSS Selector`. </br>
**e.g.,** `viewportEntry: "#stats"`

- **exeFn:** (Required) - The `exeFn`, the value of this parameter is a `function()` which will be execute. </br>
**e.g.,** `exeFn: () = {};`

- **options:** (Optional) - The `options` is the configuration of the lazyload. the value of it is an `object` with 3 properties and all are optional. </br>
**e.g.,** `options: {root: null, loadBefore: 0, loadAfter: 0}`

### Example

```html
<div id="stats"></div>
```

```js
lazy.executeFn({
    viewportEntry: "#stats",
    exeFn: () => console.log("Visible"),
    options: { // Most of the time you don't need to set this parameter,
    // the package internally handle it.
    // Only use when you want manual control.
        root: null,
        loadBefore: 0,
        loadAfter: 0
    }
});
```

---

## 💻 Usage

**NOTE:** Replace the image and video urls with actual urls


```html
<!-- ###########################################################
--------------------------- STYLES ----------------------------#
########################################################### -->
<style>
    * { padding: 0; margin: 0; }

    .wrapper {
        gap: 24px;
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
    }

    .item {
        width: 200px;
        height: 200px;
        display: block;
        object-fit: cover;
    }
</style>

<!-- ####################################################################
-------------------------------- HTML ----------------------------------#
##################################################################### -->

<!-- ------------------------ Image Elements ------------------------ -->
<div id="image-wrapper-1" class="wrapper">
    <img class="lazy-img item" data-url="/images/demo-1.jpg" />
    <img class="lazy-img item" data-url="/images/demo-2.jpg" />
</div>

<div id="image-wrapper-2" class="wrapper">
    <img class="lazy-img item" />
    <img class="lazy-img item" />
</div>

<!-- ------------------------ Video Elements ------------------------ -->
<div id="video-wrapper-1" class="wrapper">
    <iframe
        class="lazy-video item" data-url="/videos/demo-1.mp4"
        frameborder="0" width="200" height="200"
    ></iframe>
    <iframe
        class="lazy-video item" data-url="/videos/demo-2.mp4"
        frameborder="0" width="200" height="200"
    ></iframe>
</div>

<div id="video-wrapper-2" class="wrapper">
    <iframe
        class="lazy-video item"
        frameborder="0" width="200" height="200"
    ></iframe>
    <iframe
        class="lazy-video item"
        frameborder="0" width="200" height="200"
    ></iframe>
</div>

<!-- ----------------------- Function Elements ---------------------- -->
<div id="stats" class="wrapper"></div>

<!-- ####################################################################
------------------------------- SCRIPT ---------------------------------#
##################################################################### -->
<script type="module">
    import Lazyload from "@ashcroft/lazyload";
    const lazy = new Lazyload();

    // -------------------------- Configuration -------------------------
    // Most of the time you don't need this, the package internally
    // handle it. Only use when you want manual control.
    const config = {
        root: null,
        loadBefore: 0,
        loadAfter: 0
    }

    // --------------------------- Load Images --------------------------
    lazy.loadImage({
        wrapper: "#image-wrapper-1"
        srcTarget: ".lazy-img",
        options: config // Most of the time you don't need to set this
        // parameter, the package internally handle it.
        // Only use when you want manual control.
    });

    lazy.loadImage({
        wrapper: "#image-wrapper-2"
        srcTarget: ".lazy-img",
        images: ["/images/demo-1.jpg", "/images/demo-2.jpg"],
        options: config // Most of the time you don't need to set this
        // parameter, the package internally handle it.
        // Only use it when you want manual control.
    });

    // --------------------------- Load Videos --------------------------
    lazy.loadVideo({
        wrapper: "#video-wrapper-1"
        srcTarget: ".lazy-video",
        options: config // Most of the time you don't need to set this
        // parameter, the package internally handle it.
        // Only use when you want manual control.
    });

    lazy.loadVideo({
        wrapper: "#video-wrapper-2"
        srcTarget: ".lazy-video",
        videos: ["/videos/demo-1.mp4", "/videos/demo-2.mp4"],
        options: config // Most of the time you don't need to set this
        // parameter, the package internally handle it.
        // Only use it when you want manual control.
    });

    // ------------------------ Function Execution ----------------------
    async function apiCall() {
        const url = "https://jsonplaceholder.typicode.com/posts"

        const resp = await fetch(url);
        const data = await resp.json();
        console.log(data);
    }

    lazy.executeFn({
        viewportEntry: "#stats",
        exeFn: apiCall,
        options: config // Most of the time you don't need to set this
        // parameter, the package internally handle it.
        // Only use it when you want manual control.
    });
</script>
```

## 📄 License

MIT
