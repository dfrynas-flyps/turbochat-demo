import React from 'react'

interface ItalicIconProps {
  width?: number
  height?: number
  color?: string
}

const ItalicIcon: React.FC<ItalicIconProps> = ({ width = 16, height = 16, color = '#0C0D0E' }) => (
  <svg width={width} height={height} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.34474 2.16614L12.6673 2.16614C12.9435 2.16614 13.1673 2.39 13.1673 2.66614C13.1673 2.94228 12.9435 3.16614 12.6673 3.16614L9.7243 3.16614L7.30763 12.8328H10.0007C10.2768 12.8328 10.5007 13.0567 10.5007 13.3328C10.5007 13.609 10.2768 13.8328 10.0007 13.8328H6.67808C6.67113 13.833 6.66415 13.833 6.65716 13.8328H3.33398C3.05784 13.8328 2.83398 13.609 2.83398 13.3328C2.83398 13.0567 3.05784 12.8328 3.33398 12.8328H6.27685L8.69352 3.16614L6.00065 3.16614C5.72451 3.16614 5.50065 2.94229 5.50065 2.66614C5.50065 2.39 5.72451 2.16614 6.00065 2.16614L9.32233 2.16614C9.32978 2.16597 9.33725 2.16597 9.34474 2.16614Z"
      fill={color}
    />
  </svg>
)

export default ItalicIcon
