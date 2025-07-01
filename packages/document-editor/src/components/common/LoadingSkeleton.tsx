import React from 'react'

import { Box, BoxProps } from '@mui/material'
import { SxProps, styled } from '@mui/material/styles'
import ContentLoader from 'react-content-loader'

import { Dialog } from './dialog'

export const BoxLoading = styled(
  ({
    // delay,
    // itemsCount = 5,
    // animationDuration = '1s',
    // height,
    // padding,
    // border,
    ...rest
  }: BoxProps & {
    delay: number
    itemsCount?: number
    animationDuration?: string
    height?: string
    padding?: string
    border?: string
  }) => <Box {...rest} />
)`
  width: 100%;
  padding: ${({ padding }) => padding || '15px 30px'};
  border-radius: 8px;
  border: ${({ theme, border }) => border || `1px solid ${theme.palette.grey[100]};`};
  animation-duration: ${({ animationDuration = '1s' }) => animationDuration};
  animation-name: changewidth;
  animation-iteration-count: infinite;
  animation-direction: alternate;
  animation-delay: ${({ delay, itemsCount = 5 }) => `${delay / itemsCount}s`};
  @keyframes changewidth {
    from {
      opacity: 1;
    }
    to {
      opacity: 0.1;
    }
  }
  > .fill {
    width: 100%;
    height: ${({ height }) => height || '40px'};
    background: #f1f2f3;
  }
`

export const LoadingBar = styled(Box)(() => ({
  backgroundColor: '#F1F2F3',
}))

export const TableLoader = (props: {
  sx?: SxProps
  gap?: number
  height?: number
  header?: number
  amount?: number
}) => {
  const { gap = 3, amount = 4, header = 17, height = 28 } = props
  return (
    <Box {...props}>
      <ContentLoader
        uniqueKey="table-loader"
        title="table-loader"
        viewBox={`0 0 380 ${header + height * amount + gap * amount}`}
        style={{ padding: '0' }}
      >
        <rect x="0" y={0} rx="6" ry="6" width="100%" height={header} />
        <rect x="0" y={header + gap} rx="6" ry="6" width="100%" height={height} />
        <rect x="0" y={header + height + gap * 2} rx="6" ry="6" width="100%" height={height} />
        <rect x="0" y={header + height * 2 + gap * 3} rx="6" ry="6" width="100%" height={height} />
        <rect x="0" y={header + height * 3 + gap * 4} rx="6" ry="6" width="100%" height={height} />
      </ContentLoader>
    </Box>
  )
}

export const DocumentsGridLoader = (props: {
  gap?: number
  height?: number
  amount?: number
  gridSx?: SxProps
}) => {
  const { gap = 20, amount = 16, height = 272, gridSx } = props
  const array = Array(amount)
    .fill(1)
    .map((_, i) => i)
  return (
    <Box
      sx={{
        display: 'grid',
        gap: `${gap}px`,
        ...(gridSx
          ? gridSx
          : {
              gridTemplateColumns: 'repeat(3, 1fr)',
              '@media (min-width: 1200px)': {
                gridTemplateColumns: 'repeat(4, 1fr)',
              },
              '@media (min-width: 1600px)': {
                gridTemplateColumns: 'repeat(5, 1fr)',
              },
              '@media (min-width: 1920px)': {
                gridTemplateColumns: 'repeat(6, 1fr)',
              },
            }),
      }}
    >
      {array.map((x) => {
        return (
          <Box key={x} sx={{ width: '100%', height: `${height}px` }}>
            <LoadingBar width={'100%'} height={'100%'} borderRadius="6px" />
          </Box>
        )
      })}
    </Box>
  )
}

export const ButtonLoader = () => (
  <BoxLoading border={'none'} maxWidth="max-content" delay={0} padding={'0'}>
    <LoadingBar width="140px" height="32px" borderRadius="6px" />
  </BoxLoading>
)

export const SelectApplicableUnitsMapLoader = () => {
  return (
    <Box sx={{ height: '70vh', borderRadius: '10px' }}>
      <ContentLoader
        uniqueKey="selectApplicableUnitsMapLoader"
        data-testid="selectApplicableUnitsMapLoader"
        style={{ width: '100%', height: '100%' }}
      >
        <rect x="0" y="0" height="100vw" width="100%" />
      </ContentLoader>
    </Box>
  )
}

export const DialogFooterLoader = () => {
  return (
    <Dialog.Footer>
      <ButtonLoader />
      <ButtonLoader />
    </Dialog.Footer>
  )
}
