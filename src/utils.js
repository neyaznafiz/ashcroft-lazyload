/**
 * Checks if the provided DOM element is valid or not.
 * @param {Element} element - The element to check.
 * @returns {boolean} - True if the element is valid, false if not.
 */
function validDOMElement(element) {
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
function validCSSSelector(selector) {
    const checkSelector = document.querySelector(selector) || null;

    if (checkSelector) return true;
    else return false;
}

export { validDOMElement, validCSSSelector }