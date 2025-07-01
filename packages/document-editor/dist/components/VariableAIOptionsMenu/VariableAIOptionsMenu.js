import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Box, Divider, Skeleton, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useVariableLatestValues } from '../../hooks/useVariableValues';
import { clearVariableAIOptions, updateAndSaveSection, updateStatement, updateVariable } from '../../redux';
import { selectVariableAIOptions } from '../../redux/selectors';
import { VARIABLE_AI_OPTIONS_MENU_FILL_IT_IN } from '../../types/templates';
import { GradientBorder } from '../GradentBorder';
import { useSectionContext } from '../SectionContext';
import { useStatementContext } from '../StatementContext';
import LoaderIcon from '../icons/LoaderIcon';
import SparklesIcon from '../icons/SparklesIcon';
import VariableAIOptions from './VariableAIOptions';
import { IconBackground, OriginalTextButton, OriginalTextButtonCaption, OriginalTextButtonContent, PopoverContent, StyledListItemButton, StyledListItemText, StyledPopover, TypographyWrapper, } from './VariableAiOptionsMenu.styled';
const VariableAIOptionsMenu = ({ isOpen, anchorEl, currentVariable, currentValue, handleClose, menuRef, }) => {
    const [originalText, setOriginalText] = useState('');
    const dispatch = useAppDispatch();
    const autocompleteOptions = useAppSelector(selectVariableAIOptions);
    const { statement } = useStatementContext();
    const { section } = useSectionContext();
    const { updateVariableLatestValues } = useVariableLatestValues();
    const isLoading = useMemo(() => {
        return autocompleteOptions[currentVariable?.name]?.loadingState === 'loading';
    }, [autocompleteOptions, currentVariable?.name]);
    const handleOptionSelect = useCallback((value) => {
        if (!currentVariable)
            return;
        dispatch(updateVariable({
            variableName: currentVariable.name,
            newValue: value,
        }));
        if (statement?.id) {
            dispatch(updateStatement({
                id: statement.id,
                updatePayload: { _triggerUpdate: true },
                shouldSave: false,
            }));
        }
        else {
            dispatch(updateAndSaveSection({
                id: section.id,
                newValues: {
                    _triggerUpdate: true,
                },
            }));
        }
        dispatch(clearVariableAIOptions({ variableName: currentVariable.name }));
        updateVariableLatestValues(currentVariable.name, value);
        handleClose(true);
    }, [dispatch, currentVariable?.name, statement?.id, updateVariableLatestValues, handleClose, section.id]);
    const handleFillItIn = useCallback(() => {
        dispatch(clearVariableAIOptions({ variableName: currentVariable?.name }));
        handleClose(true);
    }, [currentVariable?.name, dispatch, handleClose]);
    const handleClickOutside = useCallback((event) => {
        if (isOpen) {
            const popoverElement = menuRef.current;
            const anchorElement = anchorEl;
            if (popoverElement &&
                anchorElement &&
                !popoverElement.contains(event.target) &&
                !anchorElement.contains(event.target)) {
                dispatch(clearVariableAIOptions({ variableName: currentVariable?.name }));
                handleClose(false);
            }
        }
    }, [isOpen, menuRef, anchorEl, dispatch, currentVariable?.name, handleClose]);
    useEffect(() => {
        if (isOpen) {
            setOriginalText(currentValue);
        }
    }, [currentValue, isOpen]);
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);
    return (_jsx(StyledPopover, { open: isOpen, anchorEl: anchorEl, onClose: handleClose, anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'left',
        }, disableRestoreFocus: true, disableEnforceFocus: true, disableAutoFocus: true, style: { pointerEvents: 'none' }, children: _jsxs(Box, { ref: menuRef, sx: { pointerEvents: 'auto' }, children: [_jsxs(PopoverContent, { children: [_jsxs(GradientBorder, { borderRadius: "6px", children: [_jsx(TypographyWrapper, { children: isLoading ? (_jsxs(_Fragment, { children: [_jsx(LoaderIcon, {}), _jsx(Typography, { variant: "inherit", sx: { marginLeft: '8px' }, children: "Generating Suggestions" })] })) : (_jsxs(_Fragment, { children: [_jsx(SparklesIcon, { width: 14, height: 14 }), _jsx(Typography, { variant: "inherit", sx: { marginLeft: '8px' }, children: "Suggestions" })] })) }), isLoading ? (_jsx(Box, { sx: { px: '20px', pb: '17px' }, children: _jsx(Skeleton, { variant: "text", width: "100%", height: 16, sx: { borderRadius: '2px', transform: 'none' } }) })) : (_jsx(Box, { sx: { marginTop: '-4px', paddingBottom: '8px' }, children: _jsx(VariableAIOptions, { handleOptionSelect: handleOptionSelect, currentVariable: currentVariable }) }))] }), _jsxs(OriginalTextButton, { onClick: () => handleOptionSelect(originalText), sx: {}, children: [_jsx(OriginalTextButtonCaption, { children: "Original text" }), _jsx(OriginalTextButtonContent, { children: originalText })] })] }), _jsx(Divider, {}), _jsx(PopoverContent, { children: _jsxs(StyledListItemButton, { onClick: handleFillItIn, className: VARIABLE_AI_OPTIONS_MENU_FILL_IT_IN, children: [_jsx(IconBackground, { children: _jsx("img", { src: "/static/icons/fa/pen-line.svg", alt: "pen writing icon", width: 18, height: 18, style: { display: 'block' } }) }), _jsx(StyledListItemText, { primary: "Fill it in", secondary: "Custom" })] }) })] }) }));
};
export default VariableAIOptionsMenu;
//# sourceMappingURL=VariableAIOptionsMenu.js.map