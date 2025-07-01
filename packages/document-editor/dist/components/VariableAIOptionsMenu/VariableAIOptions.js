import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Box } from '@mui/material';
import { useAppSelector } from '../../hooks/redux';
import { selectVariableAIOptions } from '../../redux/selectors';
import ReasonTooltip from './ReasonTooltip';
import { AutocompleteOption } from './VariableAiOptionsMenu.styled';
const VariableAIOptions = (props) => {
    const variableAIOptions = useAppSelector(selectVariableAIOptions);
    const isError = variableAIOptions[props.currentVariable?.name]?.loadingState === 'error';
    if (isError)
        return null;
    return (_jsx(_Fragment, { children: [0, 1].map((value) => {
            const autocompleteOptions = variableAIOptions[props.currentVariable?.name]?.variableOptions;
            const option = autocompleteOptions?.options?.[value];
            const recommendation = autocompleteOptions?.recommendation;
            const isRecommended = recommendation?.hint === value + 1;
            if (option?.text) {
                return (_jsxs(AutocompleteOption, { isRecommended: isRecommended, onClick: () => props.handleOptionSelect(option.text), children: [_jsx(Box, { sx: { flex: 1 }, children: option.text }), _jsx(Box, { className: "info", children: _jsx(ReasonTooltip, { children: option.reason }) })] }, value));
            }
            return null;
        }) }));
};
export default VariableAIOptions;
//# sourceMappingURL=VariableAIOptions.js.map