import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import MaterialRadio from '@mui/material/Radio';
const CheckedRadioIcon = ({ color }) => (_jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("rect", { width: "16", height: "16", rx: "8", fill: color }), _jsx("circle", { cx: "8", cy: "8", r: "3", fill: "white" })] }));
const RadioIcon = () => (_jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("rect", { x: "0.5", y: "0.5", width: "15", height: "15", rx: "7.5", fill: "white" }), _jsx("rect", { x: "0.5", y: "0.5", width: "15", height: "15", rx: "7.5", stroke: "#AAAFB6" })] }));
const Radio = (props) => {
    return (_jsx(MaterialRadio, { disableRipple: true, checkedIcon: _jsx(CheckedRadioIcon, { color: props.checkedColor || '#000' }), icon: _jsx(RadioIcon, {}), ...props }));
};
export default Radio;
//# sourceMappingURL=Radio.js.map