import MaterialRadio, { RadioProps } from '@mui/material/Radio'

const CheckedRadioIcon = ({ color }: { color?: string }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="16" height="16" rx="8" fill={color} />
    <circle cx="8" cy="8" r="3" fill="white" />
  </svg>
)

const RadioIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="0.5" y="0.5" width="15" height="15" rx="7.5" fill="white" />
    <rect x="0.5" y="0.5" width="15" height="15" rx="7.5" stroke="#AAAFB6" />
  </svg>
)

const Radio = (props: RadioProps & { checkedColor?: string }) => {
  return (
    <MaterialRadio
      disableRipple
      checkedIcon={<CheckedRadioIcon color={props.checkedColor || '#000'} />}
      icon={<RadioIcon />}
      {...props}
    />
  )
}

export default Radio
