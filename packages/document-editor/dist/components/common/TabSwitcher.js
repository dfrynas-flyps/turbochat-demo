import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import classes from './TabSwitcher.module.css';
const TabSwitcher = (props) => {
    const { options, activeOptionIndex, setActiveOptionIndex } = props;
    return (_jsxs(Box, { sx: { position: 'relative' }, children: [_jsx(Tabs, { value: activeOptionIndex, onChange: (_, index) => setActiveOptionIndex(index), classes: { root: classes.wrapper, indicator: classes.indicator }, children: options.map((option, index) => (_jsx(Tab, { classes: {
                        root: classes.tab,
                        selected: classes.selected,
                    }, label: option }, index))) }), props.rightSlot ? (_jsx(Box, { sx: { marginLeft: 'auto', position: 'absolute', right: '0', top: '0' }, children: props.rightSlot })) : null] }));
};
export default TabSwitcher;
//# sourceMappingURL=TabSwitcher.js.map