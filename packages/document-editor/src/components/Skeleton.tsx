import Box from '@mui/material/Box'
import styled from '@mui/material/styles/styled'

import { BoxLoading } from './common/LoadingSkeleton'

const Skeleton = ({ itemsCount = 2 }: { itemsCount?: number }) => (
  <SkeletonWrapper>
    {[...Array(itemsCount).keys()].map((key) => (
      <BoxLoading key={key} delay={key} height="16px" padding="16px 20px">
        <div className="fill" />
      </BoxLoading>
    ))}
  </SkeletonWrapper>
)

export default Skeleton

const SkeletonWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
}))
