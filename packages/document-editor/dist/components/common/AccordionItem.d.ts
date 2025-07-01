import { ReactNode } from 'react';
import { AccordionProps } from '@mui/material/Accordion';
import { AccordionSummaryProps } from '@mui/material/AccordionSummary';
type AccordionItemProps = Omit<AccordionProps, 'title'> & {
    title: ReactNode;
    isFailed?: boolean;
    isLoading?: boolean;
    endAdornment?: ReactNode;
    children: ReactNode;
    TitleProps?: Partial<AccordionSummaryProps>;
};
declare const AccordionItem: import("react").ForwardRefExoticComponent<Omit<AccordionItemProps, "ref"> & import("react").RefAttributes<HTMLDivElement | null>>;
export default AccordionItem;
//# sourceMappingURL=AccordionItem.d.ts.map