import React, { useState } from 'react'

import { QuestionMark } from '@mui/icons-material'
import Box from '@mui/material/Box'
// import CircularProgress from '@mui/material/CircularProgress'
import IconButton from '@mui/material/IconButton'
import styled from '@mui/material/styles/styled'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useStatementProposedAction } from '../../hooks/useStatementProposedAction'
import { setActiveStatement } from '../../redux'
import { selectActiveStatement, selectData } from '../../redux/selectors'
import type { TemplateStatement } from '../../types/editor'
import AccordionItem from '../common/AccordionItem'
import CommonExpandableMenu from '../common/ExpandableMenu'
import { Tooltip } from '../common/Tooltip'
import InfoCircle from '../icons/InfoCircle'
import ClassificationActions from './ClassificationActions'
import ClassificationDetails, { ColoredData } from './ClassificationDetails'
import ClassificationInfoHeader, { StaticIcon } from './ClassificationInfoHeader'
import { getClassificationContent } from './ClassificationMapping'

const ClassificationInfo = (props: {
  statement: TemplateStatement
  statementText?: string
}) => {
  const { statement, statementText } = props
  const classification = statement.classification!
  const id = statement.id
  const activeStatement = useAppSelector(selectActiveStatement)
  const data = useAppSelector(selectData)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const { proposedAction } = useStatementProposedAction({ statement })
  const dispatch = useAppDispatch()

  if (!classification && data?.state === 'success') {
    return (
      <Tooltip title="We couldn't classify this statement..." placement="top">
        <StaticIcon>
          <QuestionMark />
        </StaticIcon>
      </Tooltip>
    )
  }

  // TODO: according to types, classification doesn't have `state` prop
  // if (classification?.state === 'loading') {
  //   return (
  //     <Tooltip title="Classifying statements..." placement="top">
  //       <StaticIcon>
  //         <CircularProgress size={13} />
  //       </StaticIcon>
  //     </Tooltip>
  //   )
  // }

  const {
    classification: name,
    hint,
    patterns,
    applies,
  } = classification || { classification: null, hint: [], patterns: [], applies: null }
  const content = getClassificationContent(name)
  const forceOpen = activeStatement?.id === id && activeStatement?.classificationOpen

  const onClassificationClose = () => {
    if (activeStatement?.id) {
      dispatch(setActiveStatement({ ...activeStatement, classificationOpen: false }))
    }
  }

  return (
    <>
      <CommonExpandableMenu
        anchorRight={true}
        disableRipple
        icon={content.icon()}
        iconSize="tiny"
        iconBackground={content.color.light}
        handleCloseEffects={onClassificationClose}
        disableScrollLock
        forceOpen={forceOpen}
        renderContent={(onClose) => (
          <li data-editor-inner-click-marker>
            <Wrapper width="400px">
              <ClassificationInfoHeader
                classification={name}
                onClose={onClose}
                name={name}
                text={`${content.text('statement', name)} ${proposedAction.hint || ''}`}
                withSwitcher
                statementId={id}
              />
              <AccordionItem title="Details" TitleProps={{ sx: { fontSize: '12px', margin: '24px 0' } }}>
                <InfoBox>
                  <InfoItem>
                    Applies: <ColoredData color="info">{applies}</ColoredData>
                  </InfoItem>
                  <InfoItem>
                    Patterns: <ColoredData color="error">{patterns || 'None'}</ColoredData>
                  </InfoItem>
                  <InfoItem>
                    Action hint: <ColoredData color="success">{hint.join(', ')}</ColoredData>
                  </InfoItem>
                </InfoBox>
              </AccordionItem>

              <Buttons>
                <ClassificationActions statement={statement} />
                <IconButton aria-label="Details" onClick={() => setIsDetailsOpen(true)}>
                  <InfoCircle color="#72767D" />
                </IconButton>
              </Buttons>
            </Wrapper>
          </li>
        )}
      />
      {isDetailsOpen && (
        <ClassificationDetails
          handleClose={() => setIsDetailsOpen(false)}
          statement={statement}
          statementText={statementText ?? ''}
        />
      )}
    </>
  )
}

export default ClassificationInfo

const Wrapper = styled(Box)(() => ({
  padding: '24px',
}))

const InfoBox = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.grey[50],
  borderRadius: '8px',
  padding: '16px',
  marginBottom: '24px',
}))

const InfoItem = styled('div')(() => ({
  fontFamily: '"IBM Plex Mono", monospace',
  fontSize: '13px',
  lineHeight: '32px',
  fontWeight: 500,
}))

const Buttons = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
}))
