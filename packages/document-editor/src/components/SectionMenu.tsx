import React from 'react'

import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'

import {
  useAppDispatch,
  // useAppSelector
} from '../hooks/redux'
import {
  // clearPoolingPrompts,
  // regenerateSection,
  toggleDeleteModal,
  toggleSectionSoftDelete,
} from '../redux'
// import { selectData } from '../redux/selectors'
// import { PROCESSABLE_AI_BE_TEMPLATE_VERSION } from '../types/editor'
import { useSectionContext } from './SectionContext'
import { CommonMenu } from './common/ExpandableMenu'

export const SectionMenu: React.FC = () => {
  const { section, isSectionSoftDeleted } = useSectionContext()
  // const data = useAppSelector(selectData)
  const dispatch = useAppDispatch()
  // const isTemplatedDocument = data?.type === 'templateDocument'
  // const isTemplateProcessableByAIBackend = data?.version === PROCESSABLE_AI_BE_TEMPLATE_VERSION

  const handleSoftDeleteSection = () => {
    dispatch(toggleSectionSoftDelete({ id: section.id, isDeleted: !isSectionSoftDeleted }))
  }

  // const handleRegenerateSection = () => {
  //   if (!data) {
  //     throw new Error('Cannot regenerate section before TemplateData is loaded ')
  //   }
  //
  //   dispatch(clearPoolingPrompts())
  //   dispatch(regenerateSection({ templateId: data.id, sectionId: section.id }))
  // }

  return (
    <Box data-editor-inner-click-marker sx={{ minWidth: '200px' }}>
      <SectionMenuInfoItem disabled>Section actions</SectionMenuInfoItem>
      {/*  TODO: do we need section regeneration? */}
      {/*{!isTemplatedDocument && (*/}
      {/*  <>*/}
      {/*    <CommonMenu.Divider />*/}
      {/*    <CommonMenu.Item*/}
      {/*      onClick={handleRegenerateSection}*/}
      {/*      withBigSpacing*/}
      {/*      disabled={!isTemplateProcessableByAIBackend}*/}
      {/*    >*/}
      {/*      {`Regenerate section ${isTemplateProcessableByAIBackend ? '' : '(legacy template)'}`}*/}
      {/*    </CommonMenu.Item>*/}
      {/*  </>*/}
      {/*)}*/}
      {/*<CommonMenu.Divider />*/}
      <CommonMenu.Item onClick={handleSoftDeleteSection} withBigSpacing>
        {!isSectionSoftDeleted ? 'Remove' : 'Restore'} section
      </CommonMenu.Item>
      <CommonMenu.Divider />
      <CommonMenu.Item
        danger
        withBigSpacing
        onClick={() => dispatch(toggleDeleteModal({ id: section.id, type: 'section' }))}
      >
        Delete section permanently
      </CommonMenu.Item>
    </Box>
  )
}

const SectionMenuInfoItem = styled(CommonMenu.Item)(() => ({
  fontSize: '12px',
  fontWeight: '400',
  lineHeight: '20px',
  paddingLeft: '10px',
  color: '#72767D',
  '&.Mui-disabled': {
    opacity: 1,
  },
}))
