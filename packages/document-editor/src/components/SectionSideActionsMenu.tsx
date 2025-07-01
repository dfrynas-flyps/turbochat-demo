import { styled } from '@mui/material/styles'

import { SectionMenu } from './SectionMenu'
import CommonExpandableMenu from './common/ExpandableMenu'

export const SectionSideActionsMenu = () => {
  return (
    <SectionMenuWrapper data-editor-inner-click-marker>
      <CommonExpandableMenu
        btnClass="outlined"
        iconSize="tiny"
        disableRipple
        renderContent={SectionMenu}
        iconBackground="transparent"
        anchorRight
        transformRight
      />
    </SectionMenuWrapper>
  )
}

const SectionMenuWrapper = styled('div')(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: '-48px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  backgroundColor: '#fff',
  padding: '4px',
  borderRadius: '12px',
  border: `1px solid ${theme.palette.grey[100]}`,
  zIndex: '1',
}))
