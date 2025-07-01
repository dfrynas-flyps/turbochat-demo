type BoundsChangeHandler = (args: {
    changedRect: DOMRect;
    changedElement: HTMLElement;
    allObservedElements: HTMLElement[];
}) => void;
interface UseBoundsObserverReturn {
    observe: (elements: HTMLElement[]) => void;
    disconnect: () => void;
}
type ObserverArgs = {
    onRectChange: BoundsChangeHandler;
    compareFunction?: (rect1: DOMRect, rect2: DOMRect) => boolean;
};
/**
 * This hook observes the bounding client rect of the provided elements and triggers a callback when the rect changes.
 * It observes the absolute position of the elements, so it doesn't trigger during scrolling.
 */
export declare const useBoundingClientRectObserver: ({ onRectChange, compareFunction, }: ObserverArgs) => UseBoundsObserverReturn;
export {};
//# sourceMappingURL=useBoundingClientRectObserver.d.ts.map