export const PlusIcon = ({
  fill = '#9299A1',
  width = 12,
  height = 12,
}: {
  fill?: string
  width?: number
  height?: number
}) => (
  <svg width={width} height={height} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6 0.375C6.34518 0.375 6.625 0.654822 6.625 1V5.375H11C11.3452 5.375 11.625 5.65482 11.625 6C11.625 6.34518 11.3452 6.625 11 6.625H6.625V11C6.625 11.3452 6.34518 11.625 6 11.625C5.65482 11.625 5.375 11.3452 5.375 11V6.625H1C0.654822 6.625 0.375 6.34518 0.375 6C0.375 5.65482 0.654822 5.375 1 5.375H5.375V1C5.375 0.654822 5.65482 0.375 6 0.375Z"
      fill={fill}
    />
  </svg>
)
