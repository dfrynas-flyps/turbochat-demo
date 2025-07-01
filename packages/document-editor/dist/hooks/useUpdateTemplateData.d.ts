import type { TemplateData, TemplateStatement } from '../types/editor';
export declare const useUpdateTemplateData: () => {
    setNewTemplateName: (name: string) => Promise<void>;
    sendData: () => void;
    updateData: (newData: Partial<TemplateData>) => void;
    changeStatementsSequence: ({ sectionId, newOrder }: {
        sectionId: string;
        newOrder: TemplateStatement[];
    }) => void;
};
//# sourceMappingURL=useUpdateTemplateData.d.ts.map