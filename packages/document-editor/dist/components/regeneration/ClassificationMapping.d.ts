type ResourceType = 'section' | 'statement';
export declare const getClassificationContent: (type: string) => {
    text: (type: ResourceType) => string;
    color: {
        light: string | undefined;
        main: string | undefined;
    };
    icon: () => import("react/jsx-runtime").JSX.Element;
} | {
    text: (type: ResourceType, classification: string) => string;
    color: {
        light: string;
        main: string;
    };
    icon: () => import("react/jsx-runtime").JSX.Element;
};
export {};
//# sourceMappingURL=ClassificationMapping.d.ts.map