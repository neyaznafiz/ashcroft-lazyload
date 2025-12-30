import {validCSSSelector, validDOMElement} from "./utils.js"

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

        if (root !== null) isValidDOM = validDOMElement(root);

        if (isValidDOM === false) {
            throw new Error('Failed to construct "LazyLoad": "root" must have to be a valid DOM Element!');
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

        // Observer Options
        this.#options = {
            // The element that is used as the viewport for checking visibility
            root: root,
            // Trigger `{loadBefore}px` before the element fully enters the viewport
            rootMargin: `${loadBefore}px`,
            // Trigger when {loadAfter}% of the element is visible
            threshold: loadAfter,
        };
    }

    // #########################################################################
    // # Load Images And Videos
    // #########################################################################
    media({wrapper = null, srcTarget = null, attr = null, lazyUrls = [], options = {root: null, loadBefore: 0, loadAfter: 0}} = {}) {
        if (wrapper !== null) {
            if (validDOMElement(wrapper) === false) {
                throw new Error('Failed to construct "LazyLoad": "wrapper" must have to be a valid DOM Element or null!');
            }
        }

        if (srcTarget !== null) {
            if (
                typeof srcTarget !== "string" ||
                validCSSSelector(srcTarget) === false
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
            this.#renderMedia(attr), this.#options
        );

        let imgElements = null

        if (wrapper) {
            imgElements = wrapper.querySelectorAll(srcTarget);
        } else {
            imgElements = document.querySelectorAll(srcTarget);
        }

        if (Array.isArray(lazyUrls) === true) {
            if (lazyUrls.length) {
                for (let i = 0; i < lazyUrls.length; i++) {
                    if (typeof lazyUrls[i] !== 'string') {
                        throw new Error('Failed to construct "LazyLoad": Image path must have to be a string!');
                    }
                    else imgElements[i].dataset.lazyUrl = lazyUrls[i];
                }
            }
        }

        imgElements.forEach(srcElem => { this.#observer.observe(srcElem); });
    }


    // #########################################################################
    // # Render Images And Videos
    // #########################################################################
    #renderMedia(attr) {
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

    // #########################################################################
    // # Execute Function
    // #########################################################################
    execute({viewportEntry = null, exeFn = null, options = {root: null, loadBefore: 0, loadAfter: 0}} = {}) {
        if (validDOMElement(viewportEntry) === false) {
            throw new Error('Failed to construct "LazyLoad": "viewportEntry" is required and must be a valid DOM Element!');
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

        this.#observer.observe(viewportEntry);
    }

    // #########################################################################
    // # Handle Function Execution
    // #########################################################################
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
}

export { Lazyload };