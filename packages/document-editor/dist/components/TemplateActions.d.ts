import React from 'react';
import { useBoolean } from 'usehooks-ts';
type TemplateActionsProps = {
    children: React.ReactNode;
};
type TemplateActionsContextProps = {
    isAnySectionNameFocused: ReturnType<typeof useBoolean>;
};
export declare const TemplateActionsContext: React.Context<TemplateActionsContextProps>;
export declare const TemplateActions: (props: TemplateActionsProps) => import("react/jsx-runtime").JSX.Element;
export declare const useTemplateActionsContext: () => TemplateActionsContextProps;
export {};
//# sourceMappingURL=TemplateActions.d.ts.map