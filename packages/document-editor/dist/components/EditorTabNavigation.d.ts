import React from 'react';
type EditorTabNavigationProps = {
    children: React.ReactNode;
};
type EditorTabNavigationContextProps = {
    setTabNavigationNode: React.Dispatch<React.SetStateAction<HTMLElement | null>>;
    getTabNavigationNode: () => HTMLElement | null;
};
export declare const EditorTabNavigationContext: React.Context<EditorTabNavigationContextProps>;
export declare const EditorTabNavigation: React.FC<EditorTabNavigationProps>;
export declare const useEditorTabNavigation: () => EditorTabNavigationContextProps;
export {};
//# sourceMappingURL=EditorTabNavigation.d.ts.map