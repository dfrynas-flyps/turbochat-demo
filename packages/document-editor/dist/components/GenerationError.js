import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Fragment, useState } from 'react';
import Box from '@mui/material/Box';
import styled from '@mui/material/styles/styled';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { deleteSection,
// regenerateSection,
// updateTemplate
 } from '../redux';
import { 
// selectData,
selectIsTemplateLoading, } from '../redux/selectors';
import { SmallButton } from './common/Button';
import Loading from './common/Loading';
import { IconClose } from './common/dialog/index';
import ErrorIcon from './icons/ErrorIcon';
const Title = ({ isGlobal, failedSections }) => {
    if (isGlobal && failedSections?.length) {
        return (_jsxs(StyledTitle, { isGlobal: true, children: ["Couldn't generate the content of", ' ', failedSections.map((section, idx) => (_jsxs(Fragment, { children: [_jsx("a", { href: `#${section.id}`, children: section.name }), idx < failedSections.length - 1 ? ', ' : ' '] }, section.id))), "sections."] }));
    }
    else {
        return _jsx(StyledTitle, { children: "Couldn\u2019t generate the content of this section." });
    }
};
const GenerationError = ({ isGlobalError, failedSections, }) => {
    const [isOpen, setIsOpen] = useState(true);
    // const data = useAppSelector(selectData)
    const isTemplateLoading = useAppSelector(selectIsTemplateLoading);
    const dispatch = useAppDispatch();
    const handleRegenerate = () => {
        console.error('regenerate sections not implemented!');
        // if (failedSections.length) dispatch(updateTemplate({ isTemplateLoading: true }))
        //
        // failedSections?.forEach((section) => {
        //   if (!data?.id) return
        //   dispatch(regenerateSection({ templateId: data.id, sectionId: section.id }))
        // })
    };
    const handleRemove = () => {
        failedSections?.forEach((section) => {
            dispatch(deleteSection({ id: section.id }));
        });
    };
    if (!isOpen) {
        return null;
    }
    return (_jsxs(ErrorBox, { isGlobal: isGlobalError, children: [isGlobalError && _jsx(IconClose, { onClick: () => !isTemplateLoading && setIsOpen(false), size: 16 }), _jsx(ErrorIcon, { size: "20" }), _jsxs(Box, { children: [_jsx(Title, { isGlobal: isGlobalError, failedSections: failedSections }), isGlobalError && _jsx(Text, { children: "Scroll to see the details, retry all or remove unavailable sections." }), _jsxs(Buttons, { isGlobal: isGlobalError, children: [_jsx(SmallButton, { disabled: isTemplateLoading, onClick: handleRegenerate, children: !isTemplateLoading ? ('Retry') : (_jsxs(_Fragment, { children: ["Retrying", _jsx(LoadingWrapper, { children: _jsx(Loading, {}) })] })) }), _jsx(SmallButton, { disabled: isTemplateLoading, onClick: handleRemove, children: isGlobalError ? 'Remove unavailable sections' : 'Remove section' })] })] })] }));
};
export default GenerationError;
const ErrorBox = styled(Box, { shouldForwardProp: (prop) => prop !== 'isGlobal' })(({ isGlobal, theme }) => ({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    background: '#fff',
    padding: '20px 39px 20px 16px',
    ...(isGlobal && {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: '33px',
        borderRadius: '6px',
        border: `1px solid ${theme.palette.error[500]}`,
    }),
}));
const StyledTitle = styled('p', { shouldForwardProp: (prop) => prop !== 'isGlobal' })(({ theme, isGlobal }) => ({
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '20px',
    color: theme.palette.grey[600],
    margin: 0,
    ...(isGlobal && {
        color: theme.palette.grey[900],
    }),
}));
const Text = styled('p')(({ theme }) => ({
    fontSize: '12px',
    color: theme.palette.grey[600],
}));
const Buttons = styled('div', { shouldForwardProp: (prop) => prop !== 'isGlobal' })(({ isGlobal }) => ({
    display: 'flex',
    gap: '4px',
    marginTop: '16px',
    ...(!isGlobal && {
        justifyContent: 'center',
    }),
}));
const LoadingWrapper = styled('span')(() => ({
    display: 'inline-block',
    paddingLeft: '10px',
    opacity: 0.6,
}));
//# sourceMappingURL=GenerationError.js.map