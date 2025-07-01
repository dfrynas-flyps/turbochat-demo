import { BoxProps } from '@mui/material';
import * as React from 'react';
type LoaderIconProps = BoxProps & {
    width?: number;
    height?: number;
    color?: string;
    isSpinning?: boolean;
};
declare const LoaderIcon: React.ForwardRefExoticComponent<Omit<LoaderIconProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
export default LoaderIcon;
//# sourceMappingURL=LoaderIcon.d.ts.map