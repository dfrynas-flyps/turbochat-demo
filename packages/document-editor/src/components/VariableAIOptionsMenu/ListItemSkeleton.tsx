import { Skeleton } from '@mui/material'
import React from 'react'
import { StyledListItem, StyledListItemText } from './VariableAiOptionsMenu.styled'

const ListItemSkeleton = () => (
  <StyledListItem>
    <Skeleton variant="rectangular" width={40} height={40} />
    <StyledListItemText
      primary={
        <React.Fragment>
          <Skeleton variant="text" width="100%" height={30} />
        </React.Fragment>
      }
      secondary={<Skeleton variant="text" width="30%" height={20} />}
    />
  </StyledListItem>
)

export default ListItemSkeleton
