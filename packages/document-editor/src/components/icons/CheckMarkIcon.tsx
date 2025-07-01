import React from 'react'

type CheckMarkIconProps = {
  fill?: string
  width?: number
  height?: number
}

export const CheckMarkIcon: React.FC<CheckMarkIconProps> = ({ width = 24, height = 24, fill = '#72767D' }) => {
  return (
    <svg fill="none" height={height} viewBox="0 0 24 24" width={width} xmlns="http://www.w3.org/2000/svg">
      <path
        clipRule="evenodd"
        d="m20.5068 5.44714c.3053.27989.326.75432.0461 1.05966l-11.00003 12c-.13823.1508-.33206.2386-.53658.243-.20451.0045-.40197-.0748-.54662-.2195l-5-5c-.29289-.2929-.29289-.7677 0-1.0606s.76777-.2929 1.06066 0l4.44611 4.4461 10.47066-11.42259c.2799-.30534.7544-.32597 1.0597-.04607z"
        fill={fill}
        fillRule="evenodd"
      />
    </svg>
  )
}
