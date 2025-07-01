import React from 'react';
import { PopoverProps } from '@mui/material';
import { VariableRegistryEntry } from '../../types/editor';
interface IVariableAIOptionsMenuProps {
    isOpen: PopoverProps['open'];
    anchorEl: PopoverProps['anchorEl'];
    currentVariable: VariableRegistryEntry;
    currentValue: string;
    handleClose: (wasClosedFromMenuButton: boolean) => void;
    menuRef: React.RefObject<HTMLDivElement>;
}
declare const VariableAIOptionsMenu: React.FC<IVariableAIOptionsMenuProps>;
export default VariableAIOptionsMenu;
//# sourceMappingURL=VariableAIOptionsMenu.d.ts.map