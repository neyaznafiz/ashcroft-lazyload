class Lazyload {
    #observer = null;
    #options = null;

    constructor() { this.#config(); }

    /**
     * Configures the observer options.
     * @param {Object} [options] - Observer options.
     * @param {Element} [options.root] - The element that is used as
     *   the viewport for checking visibility of the target. Must be the
     *   ancestor of the target. Defaults to the browser viewport if not
     *   specified or if null.
     * @param {number} [options.loadBefore] - Margin around the root. If
     *   the root is null, this value is ignored. Can have values similar
     *   to the CSS margin property, e.g. "10px 20px 30px 40px" (top, right,
     *   bottom, left). The values can be percentages. This set of values
     *   serves as a shorthand for setting the individual properties.
     *   Defaults to 0 if not specified or if null.
     * @param {number|number[]} [options.loadAfter] - A single number
     *   between 0 and 1.0 which indicates at what percentage of the
     *   target's visibility the observer will trigger. Can also be an
     *   array of numbers. The callback will be called whenever the
     *   visibility of the target passes one of the values in the array.
     *   Defaults to 0 if not specified or if null.
     */
    #config({ root = null, loadBefore = 0, loadAfter = 0 } = {}) {
        let isValidDOM = true;

        if (root !== null) isValidDOM = this.#checkValidCSSSelector(root);

        if (isValidDOM === false) {
            throw new Error('Failed to construct "LazyLoad": "root" must have to be a valid CSS selector!');
        }

        if (
            loadBefore === null || loadBefore === undefined || typeof loadBefore !== 'number' || loadBefore < 0
        ) {
            throw new Error('Failed to construct "LazyLoad": "loadBefore" must have to be a positive number!');
        }

        if (
            loadAfter === null || loadAfter === undefined || typeof loadAfter !== 'number' || loadAfter < 0 || loadAfter > 1
        ) {
            throw new Error('Failed to construct "LazyLoad": "loadAfter" must have to be a number between 0 and 1!');
        }

        const rootElem = document.querySelector(root)

        // Observer Options
        this.#options = {
            // The element that is used as the viewport for checking visibility
            root: rootElem,
            // Trigger `{loadBefore}px` before the element fully enters the viewport
            rootMargin: `${loadBefore}px`,
            // Trigger when {loadAfter}% of the element is visible
            threshold: loadAfter,
        };
    }

    /**
     * Loads an image lazily when the element containing the image
     * comes into view.
     * @param {Object} [options] - Options for the lazy load.
     * @param {string} [options.selector] - The CSS selector to target
     *   elements for lazy loading. The selector must be a valid
     *   CSS selector. If not specified, an error is thrown.
     * @param {string[]} [options.images] - An array of strings where each
     *   string is a path to an image. If the array is empty, the image
     *   will be loaded from the value of the `data-path` attribute of the
     *   element. If the array is not empty, the image path is set to the
     *   first element of the array. If the element of the array is not a
     *   string, an error is thrown.
     */
    loadImage({
        wrapper = null,
        srcTarget = null,
        attr = null,
        images = [],
        options = {
            root: null,
            loadBefore: 0,
            loadAfter: 0
        }
    } = {}) {
        if (wrapper !== null) {
            if (
                typeof wrapper !== "string" ||
                this.#checkValidCSSSelector(wrapper) === false
            ) {
                throw new Error('Failed to construct "LazyLoad": "wrapper" must have to be a valid CSS selector or null!');
            }
        }

        if (srcTarget !== null) {
            if (
                typeof srcTarget !== "string" ||
                this.#checkValidCSSSelector(srcTarget) === false
            ) {
                throw new Error('Failed to construct "LazyLoad": "srcTarget" is must have to be a valid CSS selector or null!');
            }
        }

        if (attr !== null) {
            if (attr === undefined || typeof attr !== 'string') {
                throw new Error('Failed to construct "LazyLoad": "attr" is must have to be a string or null!');
            }
        }

        if (options.root !== null || options.loadBefore !== 0 || options.loadAfter !== 0) {
            this.#config({
                root: options.root,
                loadBefore: options.loadBefore,
                loadAfter: options.loadAfter
            });
        }

        this.#observer = new IntersectionObserver(
            this.#renderImage(attr), this.#options
        );

        let imgElements = null

        if (wrapper) {
            imgElements = document
                .querySelector(wrapper)
                .querySelectorAll(srcTarget);
        } else {
            imgElements = document.querySelectorAll(srcTarget);
        }

        if (Array.isArray(images) === true) {
            if (images.length) {
                for (let i = 0; i < images.length; i++) {
                    if (typeof images[i] !== 'string') {
                        throw new Error('Failed to construct "LazyLoad": Image path must have to be a string!');
                    }
                    else imgElements[i].dataset.lazyUrl = images[i];
                }
            }
        }

        imgElements.forEach(srcElem => { this.#observer.observe(srcElem); });
    }


    /**
     * Callback function for the IntersectionObserver that is called
     * when an element (i.e. an image) comes into view.
     * @param {IntersectionObserverEntry[]} entries - An array of
     *   IntersectionObserverEntry objects that represent the elements
     *   that have come into view.
     * @param {IntersectionObserver} observer - The IntersectionObserver
     *   that is watching the elements.
     */
    #renderImage(attr) {
        return (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const srcElem = entry.target;
                    const path = srcElem.dataset.lazyUrl || null;

                    if (path) {
                        attr
                            ? srcElem.setAttribute(attr, path)
                            : srcElem.src = path

                        srcElem.removeAttribute("data-lazy-url")
                    } else {
                        throw new Error('Failed to construct "LazyLoad": The url attribute name must have to be `data-lazy-url`!');
                    }

                    observer.unobserve(srcElem);
                }
            });
        }
    }

    /**
     * Loads a video lazily when the element containing the video
     * comes into view.
     * @param {Object} [options] - Options for the lazy load.
     * @param {string} [options.selector] - The CSS selector to target
     *   elements for lazy loading. The selector must be a valid
     *   CSS selector. If not specified, an error is thrown.
     * @param {string[]} [options.videos] - An array of strings where each
     *   string is a path to a video. If the array is empty, the video
     *   will be loaded from the value of the `data-path` attribute of the
     *   element. If the array is not empty, the video path is set to the
     *   first element of the array. If the element of the array is not a
     *   string, an error is thrown.
     */
    loadVideo({
        wrapper = null,
        srcTarget = null,
        attr = null,
        videos = [],
        options = {
            root: null,
            loadBefore: 0,
            loadAfter: 0
        }
    } = {}) {
        if (wrapper !== null) {
            if (
                typeof wrapper !== "string" ||
                this.#checkValidCSSSelector(wrapper) === false
            ) {
                throw new Error('Failed to construct "LazyLoad": "wrapper" must have to be a valid CSS selector or null!');
            }
        }

        if (srcTarget !== null) {
            if (
                typeof srcTarget !== "string" ||
                this.#checkValidCSSSelector(srcTarget) === false
            ) {
                throw new Error('Failed to construct "LazyLoad": "srcTarget" is required and must have to be a valid CSS selector or null!');
            }
        }

        if (attr !== null) {
            if (attr === undefined || typeof attr !== 'string') {
                throw new Error('Failed to construct "LazyLoad": "attr" is must have to be a string or null!');
            }
        }

        if (options.root !== null || options.loadBefore !== 0 || options.loadAfter !== 0) {
            this.#config({
                root: options.root,
                loadBefore: options.loadBefore,
                loadAfter: options.loadAfter
            });
        }

        this.#observer = new IntersectionObserver(
            this.#renderVideo(attr), this.#options
        );

        let vdoElements = null

        if (wrapper) {
            vdoElements = document
                .querySelector(wrapper)
                .querySelectorAll(srcTarget);
        } else {
            vdoElements = document.querySelectorAll(srcTarget);
        }

        if (Array.isArray(videos) === true) {
            if (videos.length) {
                for (let i = 0; i < videos.length; i++) {
                    if (typeof videos[i] !== 'string') {
                        throw new Error('Failed to construct "LazyLoad": Video path must have to be a string!');
                    }
                    else vdoElements[i].dataset.lazyUrl = videos[i];
                }
            }
        }

        vdoElements.forEach(srcElem => { this.#observer.observe(srcElem); });
    }

    /**
     * The callback for IntersectionObserver when the video element enters the viewport.
     * @param {string} [srcTarget] - The CSS selector of the element which holds the video path.
     *   If null, the video path is set to the element itself.
     * @param {string} [attr] - The attribute name of the element which holds the video path.
     *   If null, the video path is set to the src attribute of the element.
     * @returns {(entries: IntersectionObserverEntry[], observer: IntersectionObserver) => void} - The callback function for IntersectionObserver.
     */
    #renderVideo(attr) {
        return (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const srcElem = entry.target;
                    const path = srcElem.dataset.lazyUrl || null;

                    if (path) {
                        attr
                            ? srcElem.setAttribute(attr, path)
                            : srcElem.src = path

                        srcElem.removeAttribute("data-lazy-url")
                    } else {
                        throw new Error('Failed to construct "LazyLoad": The url attribute name must have to be `data-lazy-url`!');
                    }

                    observer.unobserve(srcElem);
                }
            });
        }
    }

    /**
     * Executes a function lazily when the element containing the
     * selector comes into view.
     * @param {Object} [options] - Options for the lazy load.
     * @param {string} [options.selector] - The CSS selector to target
     *   elements for lazy loading. The selector must be a valid
     *   CSS selector. If not specified, an error is thrown.
     * @param {function} [options.exeFn] - The function to execute when
     *   the element containing the selector comes into view. The
     *   function must be a function. If not specified, an error is thrown.
     */
    executeFn({
        viewportEntry = null,
        exeFn = null,
        options = {
            root: null,
            loadBefore: 0,
            loadAfter: 0
        }
    } = {}) {
        if (
            typeof viewportEntry !== "string" ||
            this.#checkValidCSSSelector(viewportEntry) === false
        ) {
            throw new Error('Failed to construct "LazyLoad": "viewportEntry" is required and must be a valid CSS selector!');
        }

        if (typeof exeFn !== 'function') {
            throw new Error('Failed to construct "LazyLoad": "exeFn" must be a function!');
        }

        if (options.root !== null || options.loadBefore !== 0 || options.loadAfter !== 0) {
            this.#config({
                root: options.root,
                loadBefore: options.loadBefore,
                loadAfter: options.loadAfter
            });
        }

        this.#observer = new IntersectionObserver(
            this.#handleFunctionExecution(exeFn), this.#options
        );

        const element = document.querySelector(viewportEntry);
        this.#observer.observe(element);
    }

    /**
     * Returns a callback function to be used with IntersectionObserver
     * which executes the provided function when the observed element
     * is in view, and then stops observing it.
     * 
     * @param {function} exeFn - The function to execute when the element
     *   containing the selector comes into view. The function must be a
     *   function.
     * @returns {function} - A callback function for IntersectionObserver
     *   that handles intersection changes and executes the provided
     *   function when the element is in view.
     */
    #handleFunctionExecution(exeFn) {
        return (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    exeFn();

                    observer.unobserve(entry.target);
                }
            });
        }
    }

    /**
     * Checks if the provided DOM element is valid or not.
     * @param {Element} element - The element to check.
     * @returns {boolean} - True if the element is valid, false if not.
     */
    #checkValidDOMElement(element) {
        if (element && element instanceof Element && element.nodeType === 1) {
            return true;
        }
        else return false;
    }

    /**
     * Checks if the provided CSS selector is valid.
     * @param {string} selector - The CSS selector to check.
     * @returns {boolean} - True if the selector is valid, false if not.
     */
    #checkValidCSSSelector(selector) {
        const checkSelector = document.querySelector(selector) || null;

        if (checkSelector) return true;
        else return false;
    }
}

window.Lazyload = Lazyload;
export { Lazyload };
export default Lazyload;