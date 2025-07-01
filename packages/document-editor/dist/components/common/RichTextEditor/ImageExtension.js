import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Box } from '@mui/material';
import styled from '@mui/material/styles/styled';
import Image from '@tiptap/extension-image';
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import { useDispatch } from 'react-redux';
import { setImageAsConfirmed } from '../../../redux';
import { CheckMarkIcon } from '../../icons/CheckMarkIcon';
import { SmallButton } from '../Button';
import ImageLoader from '../ImageLoader';
import ImageUpload from '../RichTextEditor/ImageUpload';
import { Dialog, IconClose } from '../dialog';
const ImageActions = ({ editor, handleReplace, handleConfirm, isReady, isDialog, }) => {
    return (_jsxs(Buttons, { isDialog: isDialog, children: [_jsx(ImageUpload, { handleImageUpload: handleReplace, editor: editor, isReplace: true }), !isReady && (_jsx(SmallButton, { onClick: handleConfirm, startIcon: _jsx(CheckMarkIcon, { width: 16, height: 16, fill: isDialog ? '#fff' : '#0c0d0e' }), children: "Use image" }))] }));
};
const ImageNode = (props) => {
    const { node: { attrs: { src }, }, updateAttributes, extension: { options: { statement }, }, editor, } = props;
    const [isReplaced, setIsReplaced] = useState(false);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);
    const isReady = statement.isImageReady || isReplaced;
    const dispatch = useDispatch();
    const handleReplace = (url) => {
        if (url) {
            setIsReplaced(true);
            setIsPreviewOpen(false);
            updateAttributes({ src: url });
        }
    };
    const handleConfirm = () => {
        setIsReplaced(true);
        setIsPreviewOpen(false);
        dispatch(setImageAsConfirmed({ id: statement.id }));
    };
    return (_jsxs(NodeViewWrapper, { children: [_jsxs(ImageContainer, { children: [_jsx(ImageWrapper, { isLoading: !isReady, children: _jsx(ImageLoader, { src: src, onClick: () => {
                                setIsPreviewOpen(true);
                            } }) }), _jsx(ImageActions, { isReady: isReady, handleConfirm: handleConfirm, handleReplace: handleReplace, editor: editor })] }), isPreviewOpen && (_jsxs(Dialog.PaperWrapper, { onClose: () => setIsPreviewOpen(false), open: true, maxWidth: false, children: [_jsx(IconClose, { onClick: () => setIsPreviewOpen(false) }), _jsxs(Dialog.ContentWrapper, { width: "1016px", children: [_jsx(Title, { children: "View and update" }), _jsxs(ModalContent, { children: [_jsx(DialogText, { children: "Use placeholder image or upload a new one." }), _jsx(ImageWrapper, { children: _jsx(ImageLoader, { src: src }) }), _jsxs(Dialog.Footer, { children: [_jsx(Dialog.CancelButton, { onClick: () => setIsPreviewOpen(false), children: "Cancel" }), _jsx(ImageActions, { isReady: isReady, handleConfirm: handleConfirm, handleReplace: handleReplace, editor: editor, isDialog: true })] })] })] })] }))] }));
};
const ImageContainer = styled('div')(() => ({
    position: 'relative',
    minWidth: '160px',
    minHeight: '80px',
}));
const ImageWrapper = styled('div', { shouldForwardProp: (prop) => prop !== 'isLoading' })(({ isLoading }) => ({
    display: 'block',
    maxWidth: '100%',
    margin: '0 auto',
    ...(isLoading && {
        opacity: '30%',
    }),
}));
const Buttons = styled('div', { shouldForwardProp: (prop) => prop !== 'isDialog' })(({ theme, isDialog }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'end',
    alignItems: 'center',
    gap: '12px',
    ...(!isDialog && {
        position: 'absolute',
        bottom: '16px',
        right: '16px',
        '& button': {
            '&:hover': {
                backgroundColor: theme.palette.grey[100],
            },
        },
    }),
}));
const ModalContent = styled(Box)(() => ({
    margin: '8px 0',
}));
const Title = styled(Dialog.Title)(() => ({
    fontSize: '20px',
    fontWeight: '600',
}));
const DialogText = styled('p')(({ theme }) => ({
    fontSize: '14px',
    color: theme.palette.grey[600],
    margin: '0 0 24px',
}));
export default Image.extend({
    addNodeView() {
        return ReactNodeViewRenderer(ImageNode);
    },
});
//# sourceMappingURL=ImageExtension.js.map