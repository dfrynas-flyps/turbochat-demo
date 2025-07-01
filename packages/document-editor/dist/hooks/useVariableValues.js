import { useCallback } from 'react';
import { setVariableLatestValues } from '../redux/index';
import { selectData } from '../redux/selectors';
import { TemplateDataTypes } from '../types/editor';
import { useAppDispatch, useAppSelector } from './redux';
export const useVariableLatestValues = () => {
    const dispatch = useAppDispatch();
    // todo
    const templateData = useAppSelector(selectData);
    const updateVariableLatestValues = useCallback((name, value) => {
        if (templateData.doc_type && templateData?.type === TemplateDataTypes.TEMPLATE_DOCUMENT) {
            dispatch(setVariableLatestValues({
                projectId: '',
                projectVariable: {
                    variableName: name,
                    variableValue: value,
                    documentId: templateData.id,
                    documentType: templateData.doc_type,
                },
            }));
        }
    }, [dispatch, templateData]);
    return { updateVariableLatestValues };
};
//# sourceMappingURL=useVariableValues.js.map