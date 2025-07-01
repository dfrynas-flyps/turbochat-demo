import React from 'react'

export const StyledCheckbox: React.FC = () => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="15" height="15" rx="3.5" fill="white" />
      <rect x="0.5" y="0.5" width="15" height="15" rx="3.5" stroke="#AAAFB6" />
    </svg>
  )
}

export const StyledCheckboxChecked: React.FC = () => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="16" height="16" rx="4" fill="#FF6B00" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.2534 4.72357C12.4061 4.86352 12.4164 5.10073 12.2764 5.2534L6.77643 11.2534C6.70732 11.3288 6.6104 11.3727 6.50815 11.3749C6.40589 11.3771 6.30716 11.3375 6.23483 11.2652L3.73483 8.76517C3.58839 8.61872 3.58839 8.38128 3.73483 8.23484C3.88128 8.08839 4.11872 8.08839 4.26517 8.23484L6.48822 10.4579L11.7236 4.74661C11.8635 4.59394 12.1007 4.58362 12.2534 4.72357Z"
        fill="white"
      />
    </svg>
  )
}

export const StyledCheckboxCheckedCustom: React.FC = () => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="16" height="16" rx="4" fill="currentColor" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.2534 4.72357C12.4061 4.86352 12.4164 5.10073 12.2764 5.2534L6.77643 11.2534C6.70732 11.3288 6.6104 11.3727 6.50815 11.3749C6.40589 11.3771 6.30716 11.3375 6.23483 11.2652L3.73483 8.76517C3.58839 8.61872 3.58839 8.38128 3.73483 8.23484C3.88128 8.08839 4.11872 8.08839 4.26517 8.23484L6.48822 10.4579L11.7236 4.74661C11.8635 4.59394 12.1007 4.58362 12.2534 4.72357Z"
        fill="white"
      />
    </svg>
  )
}

export const StyledCheckboxIndeterminate: React.FC = () => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="16" height="16" rx="4" fill="currentColor" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.625 8C4.625 7.79289 4.79289 7.625 5 7.625H8H11C11.2071 7.625 11.375 7.79289 11.375 8C11.375 8.20711 11.2071 8.375 11 8.375H8H5C4.79289 8.375 4.625 8.20711 4.625 8Z"
        fill="white"
      />
    </svg>
  )
}

export const StyledTick: React.FC = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.0892 4.53922C17.3436 4.77247 17.3608 5.16782 17.1276 5.42227L7.96088 15.4223C7.84569 15.5479 7.68417 15.6211 7.51374 15.6248C7.34331 15.6285 7.17876 15.5624 7.05822 15.4419L2.89155 11.2752C2.64748 11.0311 2.64748 10.6354 2.89155 10.3913C3.13563 10.1473 3.53136 10.1473 3.77544 10.3913L7.48053 14.0964L16.2061 4.57761C16.4394 4.32317 16.8347 4.30598 17.0892 4.53922Z"
        fill="#0C0D0E"
      />
    </svg>
  )
}
