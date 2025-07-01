import { styled } from '@mui/material/styles'
import { startCase } from 'lodash'

import { useAppSelector } from '../hooks/redux'
import { selectData } from '../redux/selectors'

export const DocumentSubtitle: React.FC = () => {
  const data = useAppSelector(selectData)
  return <ProjectSubtitle>{startCase(data?.doc_type)}</ProjectSubtitle>
}

export const ProjectSubtitle = styled('h3')(() => ({
  fontSize: '20px',
  fontWeight: 600,
  lineHeight: '32px',
  margin: '28px 0 48px',
  color: '#0C0D0E',
  textAlign: 'center',
}))
