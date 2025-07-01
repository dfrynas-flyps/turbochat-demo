import { Box, BoxProps } from '@mui/material'
import { keyframes } from '@mui/material/styles'
import * as React from 'react'

type SparklesIconProps = BoxProps & {
  width?: number
  height?: number
  color?: string
  secondaryColor?: string
  isBeating?: boolean
}

const SparklesIcon = React.forwardRef<HTMLElement, SparklesIconProps>(
  ({ width = 20, height = 20, color = 'currentColor', secondaryColor, isBeating = false, sx = {}, ...props }, ref) => (
    <Box
      component="svg"
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      sx={{ animation: isBeating ? `${beatingAnimation} 1s linear infinite` : undefined, ...sx }}
      ref={ref}
      {...props}
    >
      <g clipPath="url(#clip0_24102_33532)">
        <path
          d="M12.793 3.32773L15 2.5L15.8281 0.292617C15.8945 0.116602 16.0625 0 16.25 0C16.4375 0 16.6055 0.116602 16.6719 0.292617L17.5 2.5L19.707 3.32773C19.8828 3.39375 20 3.56211 20 3.75C20 3.9375 19.8828 4.10547 19.707 4.17188L17.5 5L16.6719 7.20703C16.6055 7.38281 16.4375 7.5 16.25 7.5C16.0625 7.5 15.8945 7.38281 15.8281 7.20703L15 5L12.793 4.17188C12.582 4.10547 12.5 3.9375 12.5 3.75C12.5 3.56211 12.582 3.39375 12.793 3.32773ZM6.875 2.86289C6.97656 2.6418 7.19922 2.5 7.44531 2.5C7.6875 2.5 7.91016 2.6418 8.01172 2.86289L10.0703 7.31641L14.5234 9.375C14.7461 9.47656 14.8867 9.69922 14.8867 9.94531C14.8867 10.1875 14.7461 10.4102 14.5234 10.5117L10.0703 12.5703L8.01172 17.0234C7.91016 17.2461 7.6875 17.3867 7.44531 17.3867C7.19922 17.3867 6.97656 17.2461 6.875 17.0234L4.81641 12.5703L0.362969 10.5117C0.14168 10.4102 0 10.1875 0 9.94531C0 9.69922 0.14168 9.47656 0.362969 9.375L4.81641 7.31641L6.875 2.86289ZM6.51953 8.10547C6.33203 8.50781 6.00781 8.83203 5.60547 9.01953L3.60625 9.94531L5.60547 10.8672C6.00781 11.0195 6.33203 11.3789 6.51953 11.7812L7.44531 13.7812L8.36719 11.7812C8.51953 11.3789 8.87891 11.0195 9.28125 10.8672L11.2812 9.94531L9.28125 9.01953C8.87891 8.83203 8.51953 8.50781 8.36719 8.10547L7.44531 6.10547L6.51953 8.10547ZM15.8281 12.793C15.8945 12.582 16.0625 12.5 16.25 12.5C16.4375 12.5 16.6055 12.582 16.6719 12.793L17.5 15L19.707 15.8281C19.8828 15.8945 20 16.0625 20 16.25C20 16.4375 19.8828 16.6055 19.707 16.6719L17.5 17.5L16.6719 19.707C16.6055 19.8828 16.4375 20 16.25 20C16.0625 20 15.8945 19.8828 15.8281 19.707L15 17.5L12.793 16.6719C12.582 16.6055 12.5 16.4375 12.5 16.25C12.5 16.0625 12.582 15.8945 12.793 15.8281L15 15L15.8281 12.793Z"
          fill={secondaryColor ? 'url(#paint0_radial_24102_33532)' : color}
        />
      </g>
      {secondaryColor && (
        <defs>
          <radialGradient
            id="paint0_radial_24102_33532"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(8 8) rotate(45) scale(11.3137)"
          >
            <stop stop-color="#FF6B00" />
            <stop offset="1" stop-color="#B7CEFD" />
          </radialGradient>
        </defs>
      )}
    </Box>
  )
)

SparklesIcon.displayName = 'SparklesIcon'

const beatingAnimation = keyframes`
  0%, 100% {
    opacity: 0.4;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.125);
  }
`

export default SparklesIcon
