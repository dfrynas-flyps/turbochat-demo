import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Box from '@mui/material/Box';
import styled from '@mui/material/styles/styled';
import { DocumentSubtitle } from './DocumentSubtitle';
import { DocumentTitle } from './DocumentTitle';
import { EditorTabNavigation } from './EditorTabNavigation';
import SectionContent from './SectionContent';
import { SectionContextProvider } from './SectionContext';
import SectionName from './SectionName';
import { StatementHistoryManager } from './StatementHistoryManager';
import { TemplateActions } from './TemplateActions';
/**
 * A decoupled editor component that can be used independently from TemplateMain
 */
const EditorComponent = ({ sections }) => {
    return (_jsxs(_Fragment, { children: [_jsxs("div", { children: [_jsx(DocumentTitle, {}), _jsx(DocumentSubtitle, {})] }), _jsx(EditorContainer, { children: _jsx(StatementHistoryManager, { children: _jsx(EditorTabNavigation, { children: _jsx(TemplateActions, { children: sections.map((section, sectionIndex) => (_jsx(SectionContextProvider, { section: section, sectionIndex: sectionIndex, children: _jsxs(StyledSection, { id: section.id, "data-prevent-section-deactivation": true, children: [_jsx(SectionName, { section: section }), _jsx(SectionContent, { section: section, sectionIndex: sectionIndex })] }) }, section.id))) }) }) }) })] }));
};
export default EditorComponent;
const EditorContainer = styled(Box)(() => ({
    width: '100%',
    position: 'relative',
}));
const StyledSection = styled(Box)(() => ({
    position: 'relative',
    marginBottom: '48px',
}));
//# sourceMappingURL=Editor.js.map