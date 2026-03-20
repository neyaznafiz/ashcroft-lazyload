import { validCSSSelector, validDOMElement } from "./utils.js";
import { TypeLazyOptions, TypeLazyMedia, TypeLazyExecute } from "./types.js";

class Lazyload {
    #observer: IntersectionObserver | null = null;
    #options: IntersectionObserverInit | null = null;

    constructor() { this.#config(); }

    /**
     * Configures the observer options.
     * @param options - Observer options.
     */
    #config({ root = null, loadBefore = 0, loadAfter = 0 }: TypeLazyOptions = {}) {
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
    media({ wrapper = null, srcTarget = null, attr = null, lazyUrls = [], options = { root: null, loadBefore: 0, loadAfter: 0 } }: TypeLazyMedia = {}) {
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

        if ((options.root !== null && options.root !== undefined) || (options.loadBefore !== 0 && options.loadBefore !== undefined) || (options.loadAfter !== 0 && options.loadAfter !== undefined)) {
            this.#config({
                root: options.root ?? null,
                loadBefore: options.loadBefore ?? 0,
                loadAfter: options.loadAfter ?? 0
            });
        }

        this.#observer = new IntersectionObserver(
            this.#renderMedia(attr), this.#options as IntersectionObserverInit
        );

        let imgElements: NodeListOf<HTMLElement> | HTMLElement[] | null = null;

        if (wrapper && srcTarget) {
            imgElements = wrapper.querySelectorAll<HTMLElement>(srcTarget);
        } else if (srcTarget) {
            imgElements = document.querySelectorAll<HTMLElement>(srcTarget);
        } else {
            // Throw error or handle if srcTarget is null? The original didn't check tightly before querySelector,
            // but `document.querySelectorAll(null)` is an error.
            imgElements = []
        }

        if (Array.isArray(lazyUrls) === true) {
            if (lazyUrls.length) {
                for (let i = 0; i < lazyUrls.length; i++) {
                    if (typeof lazyUrls[i] !== 'string') {
                        throw new Error('Failed to construct "LazyLoad": Image path must have to be a string!');
                    }
                    else if (imgElements && imgElements[i]) {
                        imgElements[i].dataset.lazyUrl = lazyUrls[i];
                    }
                }
            }
        }

        if (imgElements) {
            imgElements.forEach(srcElem => { 
                if (this.#observer) {
                    this.#observer.observe(srcElem); 
                }
            });
        }
    }


    // #########################################################################
    // # Render Images And Videos
    // #########################################################################
    #renderMedia(attr: string | null) {
        return (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const srcElem = entry.target as HTMLImageElement | HTMLVideoElement | HTMLElement;
                    const path = srcElem.dataset.lazyUrl || null;

                    if (path) {
                        if (attr) {
                            srcElem.setAttribute(attr, path);
                        } else {
                           if ('src' in srcElem) {
                                (srcElem as any).src = path;
                           }
                        }

                        srcElem.removeAttribute("data-lazy-url");
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
    execute({ viewportEntry = null, exeFn = undefined, options = { root: null, loadBefore: 0, loadAfter: 0 } }: TypeLazyExecute = {}) {
        if (validDOMElement(viewportEntry) === false || !viewportEntry) {
            throw new Error('Failed to construct "LazyLoad": "viewportEntry" is required and must be a valid DOM Element!');
        }

        if (typeof exeFn !== 'function') {
            throw new Error('Failed to construct "LazyLoad": "exeFn" must be a function!');
        }

        if ((options.root !== null && options.root !== undefined) || (options.loadBefore !== 0 && options.loadBefore !== undefined) || (options.loadAfter !== 0 && options.loadAfter !== undefined)) {
            this.#config({
                root: options.root ?? null,
                loadBefore: options.loadBefore ?? 0,
                loadAfter: options.loadAfter ?? 0
            });
        }

        this.#observer = new IntersectionObserver(
            this.#handleFunctionExecution(exeFn), this.#options as IntersectionObserverInit
        );

        this.#observer.observe(viewportEntry);
    }

    // #########################################################################
    // # Handle Function Execution
    // #########################################################################
    #handleFunctionExecution(exeFn: () => void) {
        return (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
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
