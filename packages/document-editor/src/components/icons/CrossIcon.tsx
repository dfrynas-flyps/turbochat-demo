import * as React from 'react'

interface CrossIconProps {
  width?: number
  height?: number
  color?: string
}

export const CrossIcon: React.FC<CrossIconProps> = ({ width = 24, height = 24, color = '#000' }) => (
  <svg fill="none" height={height} viewBox="0 0 24 24" width={width} xmlns="http://www.w3.org/2000/svg">
    <path
      clipRule="evenodd"
      d="m5.46967 5.46967c.29289-.29289.76777-.29289 1.06066 0l5.46967 5.46963 5.4697-5.46963c.2929-.29289.7677-.29289 1.0606 0s.2929.76777 0 1.06066l-5.4696 5.46967 5.4696 5.4697c.2929.2929.2929.7677 0 1.0606s-.7677.2929-1.0606 0l-5.4697-5.4696-5.46967 5.4696c-.29289.2929-.76777.2929-1.06066 0s-.29289-.7677 0-1.0606l5.46963-5.4697-5.46963-5.46967c-.29289-.29289-.29289-.76777 0-1.06066z"
      fill={color}
      fillRule="evenodd"
    />
  </svg>
)
