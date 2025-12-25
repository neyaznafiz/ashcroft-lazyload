
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
Or
```bash
yarn add @ashcroft/lazyload@latest
```
```js
import { Lazyload } from "@ashcroft/lazyload";
```

Or import directly using **CDN**
```js
import { Lazyload } from "https://cdn.jsdelivr.net/npm/@ashcroft/lazyload@1.1.1/module.js";
```

---

## Global Methods

| Method    | Description |
|-----------|------------------|
| media()   | Load images and videos when element will enter into the viewport. |
| execute() | Execute function when element will enter into the viewport. |

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

## 🖼️ 🎥 media()
It will load **images** and **videos** when item will enter into the viewport. the method accept 5 parameters of object:
- **wrapper:** (Optional) - The wrapper of the `srcTarget`. The value of it is `CSS Selector`.  
**e.g.,** `wrapper: "#image-wrapper"`  
**Note:** If you don't provide the `wrapper` it will select all of the elements with the selector of `srcTarget` from `DOM`, otherwise it will select only from the `wrapper`. You can handle it on your needs.

- **srcTarget:** (Required) - The selector of the elements where the image `src` will be set. The value of it is `CSS Selector`.  
**e.g.,** `srcTarget: ".lazy-img"`

- **lazyUrls:** (Optional) - An array of string(image or video url).  
**e.g.,** `lazyUrls: [ "/demo-1.jpg", "/demo-1.mp4"]`

- **attr:** (Optional) - An attribute where image url will be set. If you use this parameter, the image url will be set into this attribute of the `srcTarget` element, otherwise it will set `src` attribute with the image url into the `srcTarget` element by default.  
**e.g.,** `attr: "data-xyz"`. 
**result** `<img data-xyz="/demo-1.jpg" />`

- **options:** (Optional) - The configuration of the lazyload. the value of it is an `object` with 3 properties and all are optional.  
**e.g.,** `options: {root: null, loadBefore: 0, loadAfter: 0}`

### YOU CAN LOAD MEDIA IN TWO WAYS:

### First Example
Setting the `image url` into an attribute called `data-lazy-url`

```html
<div id="item-wrapper">
    <img class="lazy-item" data-lazy-url="/demo-1.jpg"/>
    <video class="lazy-item" data-lazy-url="/demo-1.mp4"></video>
</div>
```

```js
const lazyload = new Lazyload();

lazyload.media({
    wrapper: "#item-wrapper",
    srcTarget: ".lazy-item",
    options: { // Most of the time you don't need to set this parameter,
    // the package internally handle it.
    // Only use when you want manual control.
        root: null,
        loadBefore: 0,
        loadAfter: 0
    }
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
    lazyUrls: ["/demo-1.jpg", "/demo-1.mp4"],
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

## ⚙️ execute()
It will execute function when `viewportEntry` element will enter into the viewport. the method accept 3 parameters:

- **viewportEntry:** (Required) - The `viewportEntry` is the element where will be the function call, when the element enter into the viewport the function will be called. The value of it is `CSS Selector`.  
**e.g.,** `viewportEntry: "#stats"`

- **exeFn:** (Required) - The value of this parameter is a `function()` which will be execute.  
**e.g.,** `exeFn: () = {};`

- **options:** (Optional) - The configuration of the lazyload. the value of it is an `object` with 3 properties and all are optional.  
**e.g.,** `options: {root: null, loadBefore: 0, loadAfter: 0}`

### Example

```html
<div id="stats"></div>
```

```js
const lazyload = new Lazyload();

lazyload.execute({
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

## 📄 License

**MIT**
