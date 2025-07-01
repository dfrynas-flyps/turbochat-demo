import { TemplateStatement } from '../../types/editor';
declare const ClassificationDetails: ({ handleClose, statement, statementText, }: {
    handleClose: () => void;
    statement: TemplateStatement;
    statementText: string;
}) => import("react/jsx-runtime").JSX.Element | null;
export default ClassificationDetails;
export declare const StatementText: import("@emotion/styled").StyledComponent<import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme> & {
    margin?: string;
}, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLDivElement>, HTMLDivElement>, {}>;
type ColorKey = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
export declare const ColoredData: import("@emotion/styled").StyledComponent<import("@mui/system").MUIStyledCommonProps<import("@mui/material").Theme> & {
    color: ColorKey;
}, import("react").DetailedHTMLProps<import("react").HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>, {}>;
//# sourceMappingURL=ClassificationDetails.d.ts.map