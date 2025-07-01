import styled from '@mui/material/styles/styled'

type MarkerIconProps = {
  color?: string
}

const MarkerIcon = ({ color = '#616161' }: MarkerIconProps) => {
  return (
    <StyledMarker width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21.9356 7.04855L17.1987 1.42346C16.4387 0.520931 15.319 -7.5892e-07 14.1391 -8.62071e-07L12 -1.04907e-06L12 20L14.0189 20C15.2673 20 16.4441 19.4172 17.2006 18.4242L22.0577 12.0493C23.1929 10.5594 23.1421 8.48127 21.9356 7.04855Z"
        fill={color}
      />
      <path
        d="M12 20L4 20C1.79086 20 1.56562e-07 18.2091 3.49691e-07 16L1.39876e-06 4C1.59189e-06 1.79086 1.79086 -8.92511e-07 4 -6.99382e-07L12 0L12 20Z"
        fill={color}
      />
    </StyledMarker>
  )
}

export default MarkerIcon

export const StyledMarker = styled('svg')(() => ({
  position: 'absolute',
  top: '10px',
  left: '-52px',
}))
