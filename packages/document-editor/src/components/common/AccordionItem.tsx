import { ReactNode, forwardRef } from 'react'

import Accordion, { AccordionProps } from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary'
import styled from '@mui/material/styles/styled'

import Skeleton from '../Skeleton'
import ErrorIcon from '../icons/ErrorIcon'

type AccordionItemProps = Omit<AccordionProps, 'title'> & {
  title: ReactNode
  isFailed?: boolean
  isLoading?: boolean
  endAdornment?: ReactNode
  children: ReactNode
  TitleProps?: Partial<AccordionSummaryProps>
}

const ChevronIcon = () => (
  <svg fill="none" height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg">
    <path
      clipRule="evenodd"
      d="m5.46967 8.46967c.29289-.29289.76777-.29289 1.06066 0l5.46967 5.46963 5.4697-5.46963c.2929-.29289.7677-.29289 1.0606 0s.2929.76777 0 1.06066l-6 5.99997c-.2929.2929-.7677.2929-1.0606 0l-6.00003-5.99997c-.29289-.29289-.29289-.76777 0-1.06066z"
      fill="var(--color-gray-600)"
      fillRule="evenodd"
    />
  </svg>
)

const AccordionItem = forwardRef<HTMLDivElement | null, AccordionItemProps>(
  ({ isFailed = false, title, isLoading, endAdornment = null, children, TitleProps = {}, ...props }, ref) => {
    return (
      <StyledAccordion disableGutters ref={ref} isFailed={isFailed} {...props}>
        <TitleWrapper>
          <AccordionTitle expandIcon={isFailed ? <ErrorIcon /> : <ChevronIcon />} {...TitleProps}>
            {title}
          </AccordionTitle>

          {endAdornment}
        </TitleWrapper>

        {isLoading ? <Skeleton /> : <SectionDetails>{children}</SectionDetails>}
      </StyledAccordion>
    )
  }
)

AccordionItem.displayName = 'AccordionItem'

export default AccordionItem

const AccordionTitle = styled(AccordionSummary)(({ theme }) => ({
  fontSize: '10px',
  lineHeight: '14px',
  textTransform: 'uppercase',
  color: theme.palette.grey[600],
  margin: '24px 0 16px 0',
  flexDirection: 'row-reverse',
  padding: '0',
  minHeight: '0',
  '& .MuiAccordionSummary-content': {
    margin: '0 0 0 6px',
  },
  '&.Mui-expanded': {
    minHeight: '0',
  },
}))

const StyledAccordion = styled(Accordion, { shouldForwardProp: (prop) => prop !== 'isFailed' })<{
  isFailed: boolean
}>(({ isFailed }) => ({
  border: 'none',
  boxShadow: 'none',
  margin: '0',
  scrollMarginTop: '68px',
  '&.Mui-expanded': {
    margin: '0',
  },
  '&:before': {
    display: 'none',
  },
  ...(isFailed && {
    '& .MuiAccordionSummary-expandIconWrapper': {
      transform: 'none',
    },
  }),
}))

const SectionDetails = styled(AccordionDetails)(() => ({
  padding: '0',
  '& MuiListItem-root': {
    marginBottom: '8px',
  },
}))

const TitleWrapper = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
}))
