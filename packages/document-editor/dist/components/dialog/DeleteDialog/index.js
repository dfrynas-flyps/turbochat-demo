import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, Button, DialogActions, DialogContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Dialog, IconClose, StyledContent, StyledContentWrapper } from '../BaseDialog';
const Title = Dialog.Title;
const Content = StyledContent;
const ConfirmButton = styled(Button) `
  background-color: ${() => 'red' /* theme.palette.error[500] */};
  border-radius: 6px;
  color: #fff;
  display: flex;
  gap: 10px;
  padding: 5px 17px;
  &:hover {
    background-color: ${() => 'red' /* theme.palette.error[400] */};
  }
  & p {
    margin: 0;
  }
`;
const ConfirmDeleteDialog = ({ onCloseDialog, isDialogOpen, title, content, callToAction, styles, maxWidth, image = (_jsx(Box, { children: _jsx("img", { src: "/static/cup.svg", alt: "Cup of coffee" }) })), }) => {
    return (_jsxs(Dialog.PaperWrapper, { open: isDialogOpen, onClose: onCloseDialog, ...(maxWidth && { maxWidth: maxWidth }), children: [_jsx(IconClose, { onClick: onCloseDialog }), _jsx(DialogContent, { children: _jsxs(StyledContentWrapper, { sx: styles?.ContentWrapper ? styles?.ContentWrapper : {}, children: [image, _jsxs(Box, { children: [title, content] })] }) }), _jsx(DialogActions, { sx: { padding: '0 24px 24px', gap: '10px', ...styles?.DialogActions }, children: callToAction })] }));
};
export { Title, Content, ConfirmButton };
export default ConfirmDeleteDialog;
//# sourceMappingURL=index.js.map