import { ReactNode } from 'react';
import { TooltipProps } from '@mui/material/Tooltip';
export declare const Tooltip: import("@emotion/styled").StyledComponent<TooltipProps & {
    theme?: import("@emotion/react").Theme;
}, {}, {}>;
export declare const TooltipLight: import("@emotion/styled").StyledComponent<TooltipProps & {
    theme?: import("@emotion/react").Theme;
}, {}, {}>;
export declare const TooltipIf: ({ condition, children, TooltipComponent, ...tooltipProps }: {
    condition: boolean;
    TooltipComponent?: typeof Tooltip | typeof TooltipLight;
    children: ReactNode;
} & TooltipProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Tooltip.d.ts.map