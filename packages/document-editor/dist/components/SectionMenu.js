import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useAppDispatch,
// useAppSelector
 } from '../hooks/redux';
import { 
// clearPoolingPrompts,
// regenerateSection,
toggleDeleteModal, toggleSectionSoftDelete, } from '../redux';
// import { selectData } from '../redux/selectors'
// import { PROCESSABLE_AI_BE_TEMPLATE_VERSION } from '../types/editor'
import { useSectionContext } from './SectionContext';
import { CommonMenu } from './common/ExpandableMenu';
export const SectionMenu = () => {
    const { section, isSectionSoftDeleted } = useSectionContext();
    // const data = useAppSelector(selectData)
    const dispatch = useAppDispatch();
    // const isTemplatedDocument = data?.type === 'templateDocument'
    // const isTemplateProcessableByAIBackend = data?.version === PROCESSABLE_AI_BE_TEMPLATE_VERSION
    const handleSoftDeleteSection = () => {
        dispatch(toggleSectionSoftDelete({ id: section.id, isDeleted: !isSectionSoftDeleted }));
    };
    // const handleRegenerateSection = () => {
    //   if (!data) {
    //     throw new Error('Cannot regenerate section before TemplateData is loaded ')
    //   }
    //
    //   dispatch(clearPoolingPrompts())
    //   dispatch(regenerateSection({ templateId: data.id, sectionId: section.id }))
    // }
    return (_jsxs(Box, { "data-editor-inner-click-marker": true, sx: { minWidth: '200px' }, children: [_jsx(SectionMenuInfoItem, { disabled: true, children: "Section actions" }), _jsxs(CommonMenu.Item, { onClick: handleSoftDeleteSection, withBigSpacing: true, children: [!isSectionSoftDeleted ? 'Remove' : 'Restore', " section"] }), _jsx(CommonMenu.Divider, {}), _jsx(CommonMenu.Item, { danger: true, withBigSpacing: true, onClick: () => dispatch(toggleDeleteModal({ id: section.id, type: 'section' })), children: "Delete section permanently" })] }));
};
const SectionMenuInfoItem = styled(CommonMenu.Item)(() => ({
    fontSize: '12px',
    fontWeight: '400',
    lineHeight: '20px',
    paddingLeft: '10px',
    color: '#72767D',
    '&.Mui-disabled': {
        opacity: 1,
    },
}));
//# sourceMappingURL=SectionMenu.js.map