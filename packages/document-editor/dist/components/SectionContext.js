import { jsx as _jsx } from "react/jsx-runtime";
import React, { useContext } from 'react';
import { checkSectionSoftDeleted } from '../helpers';
const SectionContext = React.createContext({});
export const SectionContextProvider = ({ section, children, sectionIndex }) => {
    const isSectionSoftDeleted = checkSectionSoftDeleted(section);
    return (_jsx(SectionContext.Provider, { value: { section, isSectionSoftDeleted, sectionIndex }, children: children }));
};
export const useSectionContext = () => {
    const context = useContext(SectionContext);
    if (!context) {
        throw new Error('useSectionContext must be used within SectionContext');
    }
    return context;
};
//# sourceMappingURL=SectionContext.js.map