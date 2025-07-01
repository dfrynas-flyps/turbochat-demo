import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { SmallButton } from './common/Button';
import Input from './common/Input';
import { Dialog, IconClose } from './dialog/BaseDialog';
const InputModal = ({ handleCloseDialog, handleChange, handleSave, dialogTitle, inputName, value, text, }) => {
    return (_jsxs(Dialog.PaperWrapper, { onClose: handleCloseDialog, open: true, children: [_jsx(IconClose, { onClick: handleCloseDialog }), _jsxs(Dialog.ContentWrapper, { children: [_jsx(Title, { children: dialogTitle }), _jsx(Text, { children: text }), _jsx(ModalContent, { children: _jsx(Input, { name: inputName, id: inputName, autoFocus: true, value: value, className: "fullWidth", onChange: (e) => handleChange(e.currentTarget.value), onKeyUp: (e) => {
                                if (e.key === 'Enter') {
                                    handleSave();
                                }
                            } }) }), _jsx(Dialog.Footer, { children: _jsxs("div", { children: [_jsx(SmallButton, { onClick: handleSave, children: "Save" }), _jsx(Button, { sx: { marginLeft: '1rem' }, onClick: handleCloseDialog, children: "Cancel" })] }) })] })] }));
};
export default InputModal;
const ModalContent = styled(Box)(() => ({
    margin: '24px 0 32px',
}));
const Title = styled(Dialog.Title)(() => ({
    fontSize: '20px',
    fontWeight: '600',
}));
const Text = styled('p')(({ theme }) => ({
    fontSize: '14px',
    color: theme.palette.grey[600],
    margin: '8px 0 -8px',
}));
//# sourceMappingURL=InputModal.js.map