import IconButton from '@mui/material/IconButton'
import styled from '@mui/material/styles/styled'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { setActiveStatement } from '../../redux'
import { selectData } from '../../redux/selectors'
import { TemplateSection } from '../../types/editor'
import { getClassificationContent } from './ClassificationMapping'

const ClassificationInfoHeader = ({
  name,
  text,
  classification,
  withSwitcher,
  statementId,
  onClose,
}: {
  name: string
  text: string
  classification: string
  withSwitcher?: boolean
  statementId: string
  onClose: () => void
}) => {
  const dispatch = useAppDispatch()
  const data = useAppSelector(selectData)
  const allStatements = data?.sections.flatMap((section: TemplateSection) => section.statements.map((el) => el.id))
  const statementIdx = allStatements?.indexOf(statementId) || 0
  const content = getClassificationContent(classification)

  const switchStatement = (prev?: boolean) => {
    const nextIdx = prev ? statementIdx - 1 : statementIdx + 1
    if (!allStatements?.[nextIdx]) return
    dispatch(
      setActiveStatement({
        id: allStatements?.[nextIdx],
        navInitiated: true,
        classificationOpen: true,
      })
    )
  }

  return (
    <>
      <PopoverTop>
        <StaticIcon backgroundColor={content.color.light}>{content.icon()}</StaticIcon>
        {withSwitcher && (
          <Switcher>
            <SwitcherBtn
              aria-label="Go to previous statement"
              onClick={() => switchStatement(true)}
              disabled={statementIdx < 1}
            >
              <img height={20} width={20} src="/static/icons/Chevron-Up.svg" alt="" style={{ display: 'block' }} />
            </SwitcherBtn>
            <SwitcherBtn
              aria-label="Go to next statement"
              onClick={() => switchStatement(false)}
              disabled={allStatements?.length !== undefined && allStatements?.length <= statementIdx + 1}
            >
              <img height={20} width={20} src="/static/icons/Chevron-Down.svg" alt="" style={{ display: 'block' }} />
            </SwitcherBtn>
          </Switcher>
        )}
        <IconButton aria-label="close" onClick={onClose}>
          <img height={20} width={20} src="/static/icons/Cross.svg" alt="" style={{ display: 'block' }} />
        </IconButton>
      </PopoverTop>
      <Title>{name}</Title>
      <Text>{text}</Text>
    </>
  )
}

export default ClassificationInfoHeader

const PopoverTop = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '12px',
}))

const Title = styled('p')(() => ({
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: '24px',
  marginTop: 0,
}))

const Text = styled('p')(() => ({
  fontSize: '14px',
  fontWeight: 500,
  lineHeight: '20px',
  margin: '0',
}))

const Switcher = styled('div')(({ theme }) => ({
  paddingRight: '12px',
  margin: '0 12px 0 auto',
  borderRight: `1px solid ${theme.palette.grey[100]}`,
}))

const SwitcherBtn = styled(IconButton)(() => ({
  '&:disabled': {
    opacity: '0.3',
  },
}))

export const StaticIcon = styled('div', {
  shouldForwardProp: (prop) => prop !== 'backgroundColor',
})<{
  backgroundColor?: string
}>(({ backgroundColor }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '6px',
  width: '28px',
  height: '28px',
  backgroundColor: backgroundColor, //todo: || theme.palette.grey[75],
  '& svg': {
    width: '16px',
    height: '16px',
  },
}))
