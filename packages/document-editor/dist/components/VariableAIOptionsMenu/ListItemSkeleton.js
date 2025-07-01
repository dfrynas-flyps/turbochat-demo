import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Skeleton } from '@mui/material';
import React from 'react';
import { StyledListItem, StyledListItemText } from './VariableAiOptionsMenu.styled';
const ListItemSkeleton = () => (_jsxs(StyledListItem, { children: [_jsx(Skeleton, { variant: "rectangular", width: 40, height: 40 }), _jsx(StyledListItemText, { primary: _jsx(React.Fragment, { children: _jsx(Skeleton, { variant: "text", width: "100%", height: 30 }) }), secondary: _jsx(Skeleton, { variant: "text", width: "30%", height: 20 }) })] }));
export default ListItemSkeleton;
//# sourceMappingURL=ListItemSkeleton.js.map