import type { RefObject } from 'react';
type RefOrSelector<T extends HTMLElement> = RefObject<T> | string;
type OutsideClickReport<T extends HTMLElement> = {
    target: Node;
    refsAndSelectors: {
        refOrSelector: RefOrSelector<T>;
        nodes: Node | Node[];
        isClickedInside: boolean;
    }[];
};
type EventType = 'mousedown' | 'mouseup' | 'touchstart' | 'touchend' | 'focusin' | 'focusout' | 'click';
type Options = {
    isActive: boolean;
    debug: boolean;
    eventType: EventType;
};
/** Custom hook that handles clicks outside a specified element. */
export declare const useOnClickOutside: <T extends HTMLElement = HTMLElement>(ref: RefOrSelector<T> | RefOrSelector<T>[], handler: (event: MouseEvent | TouchEvent | FocusEvent, debugReport?: OutsideClickReport<T>) => void, optionsArg?: Partial<Options>) => void;
export {};
//# sourceMappingURL=useOnClickOutside.d.ts.map