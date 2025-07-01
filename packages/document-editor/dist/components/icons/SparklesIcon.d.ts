import { BoxProps } from '@mui/material';
import * as React from 'react';
type SparklesIconProps = BoxProps & {
    width?: number;
    height?: number;
    color?: string;
    secondaryColor?: string;
    isBeating?: boolean;
};
declare const SparklesIcon: React.ForwardRefExoticComponent<Omit<SparklesIconProps, "ref"> & React.RefAttributes<HTMLElement>>;
export default SparklesIcon;
//# sourceMappingURL=SparklesIcon.d.ts.map