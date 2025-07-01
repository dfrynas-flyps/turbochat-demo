import React from 'react'

type CircleCheckFilledIconProps = {
  width?: number
  height?: number
  color?: string
}

export const CircleCheckFilledIcon: React.FC<CircleCheckFilledIconProps> = ({
  width = 24,
  height = 24,
  color = '#000000',
}) => {
  return (
    <svg width={width} height={height} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.00016 13.6666C10.6821 13.6666 13.6668 10.6818 13.6668 6.99992C13.6668 3.31802 10.6821 0.333252 7.00016 0.333252C3.31826 0.333252 0.333496 3.31802 0.333496 6.99992C0.333496 10.6818 3.31826 13.6666 7.00016 13.6666ZM10.1972 5.53025C10.4901 5.23736 10.4901 4.76248 10.1972 4.46959C9.90427 4.1767 9.42939 4.1767 9.1365 4.46959L6.3335 7.27259L5.53049 6.46959C5.2376 6.17669 4.76273 6.17669 4.46983 6.46959C4.17694 6.76248 4.17694 7.23736 4.46983 7.53025L5.80317 8.86358C6.09606 9.15648 6.57093 9.15648 6.86383 8.86358L10.1972 5.53025Z"
        fill={color}
      />
    </svg>
  )
}
