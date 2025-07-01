import React from 'react';
import { TemplateSection } from '../types/editor';
type SectionContextProps = {
    section: TemplateSection;
    sectionIndex: number;
    isSectionSoftDeleted?: boolean;
};
type SectionContextProviderProps = SectionContextProps & {
    children: React.ReactNode;
};
export declare const SectionContextProvider: React.FC<SectionContextProviderProps>;
export declare const useSectionContext: () => SectionContextProps;
export {};
//# sourceMappingURL=SectionContext.d.ts.map