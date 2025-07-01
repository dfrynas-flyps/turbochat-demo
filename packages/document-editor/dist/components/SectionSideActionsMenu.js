import { jsx as _jsx } from "react/jsx-runtime";
import { styled } from '@mui/material/styles';
import { SectionMenu } from './SectionMenu';
import CommonExpandableMenu from './common/ExpandableMenu';
export const SectionSideActionsMenu = () => {
    return (_jsx(SectionMenuWrapper, { "data-editor-inner-click-marker": true, children: _jsx(CommonExpandableMenu, { btnClass: "outlined", iconSize: "tiny", disableRipple: true, renderContent: SectionMenu, iconBackground: "transparent", anchorRight: true, transformRight: true }) }));
};
const SectionMenuWrapper = styled('div')(({ theme }) => ({
    position: 'absolute',
    top: 0,
    right: '-48px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    backgroundColor: '#fff',
    padding: '4px',
    borderRadius: '12px',
    border: `1px solid ${theme.palette.grey[100]}`,
    zIndex: '1',
}));
//# sourceMappingURL=SectionSideActionsMenu.js.map