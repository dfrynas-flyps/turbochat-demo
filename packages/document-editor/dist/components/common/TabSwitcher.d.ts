import React, { ReactNode } from 'react';
interface Props {
    options: ReactNode[];
    activeOptionIndex: number;
    setActiveOptionIndex: (index: number) => void;
    rightSlot?: ReactNode;
}
declare const TabSwitcher: React.FC<Props>;
export default TabSwitcher;
//# sourceMappingURL=TabSwitcher.d.ts.map