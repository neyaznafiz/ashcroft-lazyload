export interface TypeLazyOptions {
    root?: Element | null;
    loadBefore?: number;
    loadAfter?: number;
}

export interface TypeLazyMedia {
    wrapper?: Element | null;
    srcTarget?: string | null;
    attr?: string | null;
    lazyUrls?: string[];
    options?: TypeLazyOptions;
}

export interface TypeLazyExecute {
    viewportEntry?: Element | null;
    exeFn?: () => void;
    options?: TypeLazyOptions;
}