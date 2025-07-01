import React from 'react'

import Box from '@mui/material/Box'
import styled from '@mui/material/styles/styled'

import { TemplateSection } from '../types/editor'
import { DocumentSubtitle } from './DocumentSubtitle'
import { DocumentTitle } from './DocumentTitle'
import { EditorTabNavigation } from './EditorTabNavigation'
import SectionContent from './SectionContent'
import { SectionContextProvider } from './SectionContext'
import SectionName from './SectionName'
import { StatementHistoryManager } from './StatementHistoryManager'
import { TemplateActions } from './TemplateActions'

type EditorComponentProps = {
  sections: TemplateSection[]
}

/**
 * A decoupled editor component that can be used independently from TemplateMain
 */
const EditorComponent: React.FC<EditorComponentProps> = ({ sections }) => {
  return (
    <>
      <div>
        <DocumentTitle />
        <DocumentSubtitle />
      </div>
      <EditorContainer>
        <StatementHistoryManager>
          <EditorTabNavigation>
            <TemplateActions>
              {sections.map((section, sectionIndex) => (
                <SectionContextProvider section={section} key={section.id} sectionIndex={sectionIndex}>
                  <StyledSection id={section.id} data-prevent-section-deactivation>
                    <SectionName section={section} />
                    <SectionContent section={section} sectionIndex={sectionIndex} />
                  </StyledSection>
                </SectionContextProvider>
              ))}
            </TemplateActions>
          </EditorTabNavigation>
        </StatementHistoryManager>
      </EditorContainer>
    </>
  )
}

export default EditorComponent

const EditorContainer = styled(Box)(() => ({
  width: '100%',
  position: 'relative',
}))

const StyledSection = styled(Box)(() => ({
  position: 'relative',
  marginBottom: '48px',
}))
