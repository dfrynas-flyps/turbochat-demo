import React from 'react'

interface UndoIconProps {
  width?: number
  height?: number
  color?: string
}

const UndoIcon: React.FC<UndoIconProps> = ({ width = 16, height = 16, color = '#0C0D0E' }) => (
  <svg width={width} height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.02022 1.64645C5.21548 1.84171 5.21548 2.15829 5.02022 2.35355L3.20711 4.16667H10C12.4853 4.16667 14.5 6.18139 14.5 8.66667C14.5 11.1519 12.4853 13.1667 10 13.1667H7.33333C7.05719 13.1667 6.83333 12.9428 6.83333 12.6667C6.83333 12.3905 7.05719 12.1667 7.33333 12.1667H10C11.933 12.1667 13.5 10.5997 13.5 8.66667C13.5 6.73367 11.933 5.16667 10 5.16667H3.20711L5.02022 6.97978C5.21548 7.17504 5.21548 7.49162 5.02022 7.68689C4.82496 7.88215 4.50838 7.88215 4.31311 7.68689L1.64645 5.02022C1.45118 4.82496 1.45118 4.50838 1.64645 4.31311L4.31311 1.64645C4.50838 1.45118 4.82496 1.45118 5.02022 1.64645Z"
      fill={color}
    />
  </svg>
)

export default UndoIcon
