import { jsx as _jsx } from "react/jsx-runtime";
import Box from '@mui/material/Box';
import styled from '@mui/material/styles/styled';
import { BoxLoading } from './common/LoadingSkeleton';
const Skeleton = ({ itemsCount = 2 }) => (_jsx(SkeletonWrapper, { children: [...Array(itemsCount).keys()].map((key) => (_jsx(BoxLoading, { delay: key, height: "16px", padding: "16px 20px", children: _jsx("div", { className: "fill" }) }, key))) }));
export default Skeleton;
const SkeletonWrapper = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
}));
//# sourceMappingURL=Skeleton.js.map