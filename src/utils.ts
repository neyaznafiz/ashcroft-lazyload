/**
 * Checks if the provided DOM element is valid or not.
 * @param element - The element to check.
 * @returns - True if the element is valid, false if not.
 */
function validDOMElement(element: any): boolean {
    if (element && element instanceof Element && element.nodeType === 1) {
        return true;
    }
    else return false;
}

/**
 * Checks if the provided CSS selector is valid.
 * @param selector - The CSS selector to check.
 * @returns - True if the selector is valid, false if not.
 */
function validCSSSelector(selector: string): boolean {
    const checkSelector = document.querySelector(selector) || null;

    if (checkSelector) return true;
    else return false;
}

export { validDOMElement, validCSSSelector }
