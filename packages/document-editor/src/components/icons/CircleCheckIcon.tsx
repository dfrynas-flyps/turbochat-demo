import React from 'react'

type CircleCheckIconProps = {
  width?: number
  height?: number
  color?: string
}

export const CircleCheckIcon: React.FC<CircleCheckIconProps> = ({ width = 24, height = 24, color = '#000000' }) => {
  return (
    <svg width={width} height={height} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.5 7C1.5 3.96243 3.96243 1.5 7 1.5C10.0376 1.5 12.5 3.96243 12.5 7C12.5 10.0376 10.0376 12.5 7 12.5C3.96243 12.5 1.5 10.0376 1.5 7ZM7 0.5C3.41015 0.5 0.5 3.41015 0.5 7C0.5 10.5899 3.41015 13.5 7 13.5C10.5899 13.5 13.5 10.5899 13.5 7C13.5 3.41015 10.5899 0.5 7 0.5ZM10.0202 5.35355C10.2155 5.15829 10.2155 4.84171 10.0202 4.64645C9.82496 4.45118 9.50838 4.45118 9.31311 4.64645L6.33333 7.62623L5.35355 6.64645C5.15829 6.45118 4.84171 6.45118 4.64645 6.64645C4.45118 6.84171 4.45118 7.15829 4.64645 7.35355L5.97978 8.68689C6.07355 8.78065 6.20073 8.83333 6.33333 8.83333C6.46594 8.83333 6.59312 8.78065 6.68689 8.68689L10.0202 5.35355Z"
        fill={color}
      />
    </svg>
  )
}
