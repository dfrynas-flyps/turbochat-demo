import { Dispatch, SetStateAction } from 'react';
type ModalProps = {
    handleCloseDialog: () => void;
    handleChange: Dispatch<SetStateAction<string>>;
    handleSave: () => void;
    dialogTitle: string;
    inputName: string;
    value: string;
    text?: string;
};
declare const InputModal: ({ handleCloseDialog, handleChange, handleSave, dialogTitle, inputName, value, text, }: ModalProps) => import("react/jsx-runtime").JSX.Element;
export default InputModal;
//# sourceMappingURL=InputModal.d.ts.map