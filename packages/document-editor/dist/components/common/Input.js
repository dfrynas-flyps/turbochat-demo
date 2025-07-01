import { jsx as _jsx } from "react/jsx-runtime";
import { OutlinedInput } from '@mui/material';
import SearchIcon from '../icons/SearchIcon';
export default function Input(props) {
    return _jsx(OutlinedInput, { ...props });
}
export function SearchInput(props) {
    return _jsx(OutlinedInput, { ...props, startAdornment: _jsx(SearchIcon, {}) });
}
//# sourceMappingURL=Input.js.map