import { jsx as _jsx } from "react/jsx-runtime";
import { styled } from '@mui/material/styles';
import { startCase } from 'lodash';
import { useAppSelector } from '../hooks/redux';
import { selectData } from '../redux/selectors';
export const DocumentSubtitle = () => {
    const data = useAppSelector(selectData);
    return _jsx(ProjectSubtitle, { children: startCase(data?.doc_type) });
};
export const ProjectSubtitle = styled('h3')(() => ({
    fontSize: '20px',
    fontWeight: 600,
    lineHeight: '32px',
    margin: '28px 0 48px',
    color: '#0C0D0E',
    textAlign: 'center',
}));
//# sourceMappingURL=DocumentSubtitle.js.map