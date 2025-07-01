import { saveData, setData } from '../redux/index'
import { selectData } from '../redux/selectors'
import type { TemplateData, TemplateStatement } from '../types/editor'
import { useAppDispatch, useAppSelector } from './redux'

// TODO: this hook should be probably eliminated
const templateId = '123'
export const useUpdateTemplateData = () => {
  // const entityContext = useRouterEntityContext()
  const dispatch = useAppDispatch()
  const currentTemplateData = useAppSelector(selectData)
  // const router = useRouter()
  // const {
  //   query: { id: templateId },
  // } = router

  const sendData = () => {
    debugger
    if (!currentTemplateData) return
    dispatch(saveData({ id: templateId as string, data: currentTemplateData }))
  }

  const updateData = (newData: Partial<TemplateData>) => {
    debugger
    if (!currentTemplateData) return
    const data = { ...currentTemplateData, ...newData }
    dispatch(setData(data))
    dispatch(saveData({ id: templateId as string, data }))
  }

  const setNewTemplateName = async (name: string) => {
    debugger
    if (!currentTemplateData) return
    const newData = { ...currentTemplateData, name }
    updateData(newData)
  }

  const changeStatementsSequence = ({ sectionId, newOrder }: { sectionId: string; newOrder: TemplateStatement[] }) => {
    debugger
    if (!currentTemplateData) return
    const newSections = currentTemplateData.sections.map((section) => ({
      ...section,
      statements: section.id === sectionId ? newOrder : section.statements,
    }))

    updateData({
      sections: newSections,
    })
  }

  return {
    setNewTemplateName,
    sendData,
    updateData,
    changeStatementsSequence,
  }
}
