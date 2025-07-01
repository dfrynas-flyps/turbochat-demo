import { saveData, setData } from '../redux/index';
import { selectData } from '../redux/selectors';
import { useAppDispatch, useAppSelector } from './redux';
// TODO: this hook should be probably eliminated
const templateId = '123';
export const useUpdateTemplateData = () => {
    // const entityContext = useRouterEntityContext()
    const dispatch = useAppDispatch();
    const currentTemplateData = useAppSelector(selectData);
    // const router = useRouter()
    // const {
    //   query: { id: templateId },
    // } = router
    const sendData = () => {
        debugger;
        if (!currentTemplateData)
            return;
        dispatch(saveData({ id: templateId, data: currentTemplateData }));
    };
    const updateData = (newData) => {
        debugger;
        if (!currentTemplateData)
            return;
        const data = { ...currentTemplateData, ...newData };
        dispatch(setData(data));
        dispatch(saveData({ id: templateId, data }));
    };
    const setNewTemplateName = async (name) => {
        debugger;
        if (!currentTemplateData)
            return;
        const newData = { ...currentTemplateData, name };
        updateData(newData);
    };
    const changeStatementsSequence = ({ sectionId, newOrder }) => {
        debugger;
        if (!currentTemplateData)
            return;
        const newSections = currentTemplateData.sections.map((section) => ({
            ...section,
            statements: section.id === sectionId ? newOrder : section.statements,
        }));
        updateData({
            sections: newSections,
        });
    };
    return {
        setNewTemplateName,
        sendData,
        updateData,
        changeStatementsSequence,
    };
};
//# sourceMappingURL=useUpdateTemplateData.js.map