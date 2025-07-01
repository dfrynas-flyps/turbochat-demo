import { jsx as _jsx } from "react/jsx-runtime";
import { ThemeProvider } from '@mui/material';
import React, { useContext } from 'react';
import { Provider } from 'react-redux';
import reduxStore from '../redux/store';
import theme from '../styles/theme';
import { EditorWrapper } from './EditorWrapper';
const EditorContext = React.createContext({ isPreviewMode: false });
export const EditorContainer = ({ id, isPreviewMode = false }) => {
    return (_jsx(Provider, { store: reduxStore, children: _jsx(ThemeProvider, { theme: theme, children: _jsx(EditorContext.Provider, { value: { isPreviewMode }, children: _jsx(EditorWrapper, { id: id }) }) }) }));
};
export const useEditorContext = () => {
    const context = useContext(EditorContext);
    if (!context) {
        throw new Error('useEditorContext must be used within EditorContext');
    }
    return context;
};
//# sourceMappingURL=EditorContainer.js.map