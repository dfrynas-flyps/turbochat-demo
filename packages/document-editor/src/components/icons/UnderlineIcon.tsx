import React from 'react'

interface UnderlineIconProps {
  width?: number
  height?: number
  color?: string
}

const UnderlineIcon: React.FC<UnderlineIconProps> = ({ width = 16, height = 16, color = '#0C0D0E' }) => (
  <svg width={width} height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.16666 2.66602C5.16666 2.38987 4.94281 2.16602 4.66666 2.16602C4.39052 2.16602 4.16666 2.38987 4.16666 2.66602L4.16667 7.33268C4.16667 9.44978 5.88291 11.166 8 11.166C10.1171 11.166 11.8333 9.44977 11.8333 7.33268V2.66602C11.8333 2.38987 11.6095 2.16602 11.3333 2.16602C11.0572 2.16602 10.8333 2.38987 10.8333 2.66602L10.8333 7.33268C10.8333 8.89749 9.56481 10.166 8 10.166C6.43519 10.166 5.16667 8.89749 5.16667 7.33268L5.16666 2.66602ZM4 12.8327C3.72386 12.8327 3.5 13.0565 3.5 13.3327C3.5 13.6088 3.72386 13.8327 4 13.8327L12 13.8327C12.2761 13.8327 12.5 13.6088 12.5 13.3327C12.5 13.0565 12.2761 12.8327 12 12.8327L4 12.8327Z"
      fill={color}
    />
  </svg>
)

export default UnderlineIcon
