import { OutlinedInput, OutlinedInputProps } from '@mui/material'
import SearchIcon from '../icons/SearchIcon'

export default function Input(props: OutlinedInputProps) {
  return <OutlinedInput {...props} />
}

export function SearchInput(props: OutlinedInputProps) {
  return <OutlinedInput {...props} startAdornment={<SearchIcon />} />
}
