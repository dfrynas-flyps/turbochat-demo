import { Alert, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { styled } from '@mui/material/styles'

import { useStatementProposedAction } from '../../hooks/useStatementProposedAction'
import { TemplateStatement } from '../../types/editor'
import { SmallButton } from '../common/Button'
import { Dialog, IconClose } from '../common/dialog/index'
import { getClassificationContent } from './ClassificationMapping'

const ClassificationDetails = ({
  handleClose,
  statement,
  statementText,
}: {
  handleClose: () => void
  statement: TemplateStatement
  statementText: string
}) => {
  const { proposedAction } = useStatementProposedAction({ statement })

  if (!statement.classification) {
    return null
  }

  const { classification: name, hint, patterns, applies } = statement.classification
  const content = getClassificationContent(name)

  return (
    <Dialog.PaperWrapper data-editor-inner-click-marker onClose={handleClose} open={true} maxWidth={false}>
      <IconClose onClick={handleClose} />
      <Dialog.ContentWrapper width="710px">
        <Title>Statement hint</Title>
        <Text>Review the statement hints below and decide on the suggested action.</Text>
        {statement.turnOffVariables && (
          <StyledAlert severity="info" variant="outlined">
            Variables have been turned-off.
          </StyledAlert>
        )}
        <StatementText dangerouslySetInnerHTML={{ __html: statementText }} margin="0 0 24px" />
        <TableContainer component="div">
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell>Hint</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <HintCell>
                  Classification: <ColoredData color="primary">{name}</ColoredData>
                </HintCell>
                <TableCell>{content.text('statement', name)}</TableCell>
              </TableRow>
              <TableRow>
                <HintCell>
                  Applies: <ColoredData color="info">{applies}</ColoredData>
                </HintCell>
                <TableCell>Likely only applies to {applies}/10 projects.</TableCell>
              </TableRow>
              <TableRow>
                <HintCell>
                  Patterns: <ColoredData color="error">{patterns || 'None'}</ColoredData>
                </HintCell>
                <TableCell>—</TableCell>
              </TableRow>
              <TableRow>
                <HintCell>
                  Action hint: <ColoredData color="success">{hint.join(', ')}</ColoredData>
                </HintCell>
                <TableCell>{proposedAction.hint}</TableCell>
              </TableRow>
            </TableBody>
          </StyledTable>
        </TableContainer>
        <Dialog.Footer>
          <Button onClick={handleClose}>Close</Button>
          {proposedAction?.applyAction && (
            <SmallButton onClick={() => proposedAction.applyAction()}>{proposedAction.text}</SmallButton>
          )}
        </Dialog.Footer>
      </Dialog.ContentWrapper>
    </Dialog.PaperWrapper>
  )
}

export default ClassificationDetails

const Title = styled(Dialog.Title)(() => ({
  fontSize: '20px',
  fontWeight: '600',
}))

const Text = styled('p')(({ theme }) => ({
  color: theme.palette.grey[600],
  fontSize: '14px',
  lineHeight: '20px',
  margin: '8px 0 24px',
}))

export const StatementText = styled('div', { shouldForwardProp: (prop) => prop !== 'margin' })<{
  margin?: string
}>(({ theme, margin }) => ({
  backgroundColor: theme.palette.grey[50],
  borderRadius: '8px',
  padding: '24px',
  margin,
  fontSize: '14px',
  lineHeight: '20px',
  '& span.variable-preview': {
    backgroundColor: 'transparent',
    color: theme.palette.grey[500],
    borderBottom: `1px solid ${theme.palette.grey[500]}`,
  },
}))

const StyledTable = styled(Table)(({ theme }) => ({
  '& th': {
    fontWeight: 500,
    fontSize: '12px',
    color: theme.palette.grey[500],
    textTransform: 'uppercase',
    padding: '12px 0',
  },
  '& td': {
    padding: '14px 0',
  },
}))

const HintCell = styled(TableCell)(() => ({
  fontFamily: '"IBM Plex Mono", monospace',
  fontSize: '13px',
  fontWeight: 500,
}))

const StyledAlert = styled(Alert)(() => ({
  fontSize: '12px',
  lineHeight: '20px',
  marginBottom: '24px',
  '&.MuiPaper-root': {
    borderRadius: '6px',
  },
}))

type ColorKey = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success'
export const ColoredData = styled('span')<{ color: ColorKey }>(({ theme, color }) => ({
  color: theme.palette[color]?.['500'] || theme.palette[color]?.main || 'inherit',
}))
