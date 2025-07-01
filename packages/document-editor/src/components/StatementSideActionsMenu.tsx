import Box from '@mui/material/Box'
import styled from '@mui/material/styles/styled'

import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { formatStatementText } from '../helpers/parseTemplateStatements'
import { deleteStatement, setActiveStatement } from '../redux'
import { selectProjectData, selectVariableRegistry } from '../redux/selectors'
import { TemplateStatement } from '../types/editor'
import { useSectionContext } from './SectionContext'
import CommonExpandableMenu, { CommonMenu } from './common/ExpandableMenu'
import ClassificationInfo from './regeneration/ClassificationInfo'

type StatementSideActionsMenuProps = {
  statement: TemplateStatement
}

export const StatementSideActionsMenu: React.FC<StatementSideActionsMenuProps> = ({ statement }) => {
  const dispatch = useAppDispatch()
  const projectData = useAppSelector(selectProjectData)
  const variableRegistry = useAppSelector(selectVariableRegistry)

  const { section } = useSectionContext()

  const handleDeleteStatement = () => {
    dispatch(deleteStatement({ id: statement.id }))
    dispatch(setActiveStatement(null))
  }

  return (
    <MenuWrapper>
      {statement.type !== 'image' && (
        <ClassificationInfo
          statement={statement}
          statementText={formatStatementText({
            statement,
            sectionId: section.id,
            variableRegistry,
            variableOutput: 'decorated',
            projectData,
          })}
        />
      )}

      <CommonExpandableMenu
        anchorRight={true}
        transformRight={true}
        btnClass="outlined"
        iconSize="tiny"
        disableRipple
        renderContent={() => (
          <Box data-editor-inner-click-marker>
            <CommonMenu.Item danger withBigSpacing onClick={handleDeleteStatement}>
              Delete this statement permanently
            </CommonMenu.Item>
          </Box>
        )}
      />
    </MenuWrapper>
  )
}

const MenuWrapper = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: '-60px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  backgroundColor: '#fff',
  padding: '4px',
  borderRadius: '12px',
  border: `1px solid ${theme.palette.grey[100]}`,
  zIndex: '1',
}))
