import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Box from '@mui/material/Box';
import styled from '@mui/material/styles/styled';
import CommonExpandableMenu, { CommonMenu } from './common/ExpandableMenu';
import { StyledTick } from './icons/Checkbox';
const HeadingSwitcherDropdown = ({ editor, onHeadingLevelChange, icon, currentHeadingLevel, }) => {
    const levels = [1, 2, 3, 4];
    const SingleMenuItem = ({ level, currentLevel }) => {
        if (!editor) {
            return (_jsxs(StyledMenuItem, { onClick: () => {
                    onHeadingLevelChange(level);
                }, className: level === currentLevel ? 'is-active' : '', disabled: level === currentLevel, withBigSpacing: true, children: [`Heading ${level}`, level === currentLevel && _jsx(StyledTick, {})] }));
        }
        return (_jsxs(StyledMenuItem, { onClick: () => onHeadingLevelChange(level), className: editor?.isActive('heading', { level: level }) ? 'is-active' : '', disabled: editor?.isActive('heading', { level: level }), withBigSpacing: true, children: [`Heading ${level}`, editor?.isActive('heading', { level: level }) && _jsx(StyledTick, {})] }));
    };
    return (_jsx(CommonExpandableMenu, { anchorRight: false, transformRight: false, icon: icon, disableScrollLock: true, forceOpen: false, renderContent: () => (_jsx(Box, { sx: { minWidth: '200px' }, "data-prevent-section-deactivation": true, children: levels.map((level) => (_jsx(SingleMenuItem, { level: level, currentLevel: currentHeadingLevel }, level))) })) }));
};
export default HeadingSwitcherDropdown;
const StyledMenuItem = styled(CommonMenu.Item)(() => ({
    '&.MuiMenuItem-root.Mui-disabled.is-active': {
        opacity: 1,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
}));
//# sourceMappingURL=HeadingSwitcherDropdown.js.map