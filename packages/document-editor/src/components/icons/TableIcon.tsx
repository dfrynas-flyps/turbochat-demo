import React from 'react'

interface TableIconProps {
  width?: number
  height?: number
  color?: string
}

const TableIcon: React.FC<TableIconProps> = ({ width = 12, height = 12, color = '#0C0D0E' }) => (
  <svg width={width} height={height} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.166748 0.666626C0.166748 0.390484 0.390606 0.166626 0.666748 0.166626H6.00008H11.3334C11.6096 0.166626 11.8334 0.390484 11.8334 0.666626V5.99996V11.3333C11.8334 11.6094 11.6096 11.8333 11.3334 11.8333H6.00008H0.666748C0.390606 11.8333 0.166748 11.6094 0.166748 11.3333V5.99996V0.666626ZM1.16675 1.16663V5.49996H5.50008V1.16663H1.16675ZM6.50008 1.16663V5.49996H10.8334V1.16663H6.50008ZM10.8334 6.49996H6.50008V10.8333H10.8334V6.49996ZM5.50008 10.8333V6.49996H1.16675V10.8333H5.50008Z"
      fill={color}
    />
  </svg>
)

export default TableIcon
