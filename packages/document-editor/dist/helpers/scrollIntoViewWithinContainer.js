export const scrollIntoViewWithinContainer = (container, element, SCROLL_TOP_OFFSET) => {
    if (!container || !element)
        return null;
    const containerRect = container.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();
    const isInContainer = elementRect.top >= containerRect.top && elementRect.bottom <= containerRect.bottom;
    if (!isInContainer) {
        const relativeTop = elementRect.top - containerRect.top;
        const newScrollTop = container.scrollTop + relativeTop - SCROLL_TOP_OFFSET;
        container.scrollTo({
            top: newScrollTop,
            behavior: 'smooth',
        });
    }
};
//# sourceMappingURL=scrollIntoViewWithinContainer.js.map