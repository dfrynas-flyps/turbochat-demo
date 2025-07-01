import React from 'react'

import { isLoading } from '../helpers'
import { TemplateSection } from '../types/editor'
import GenerationError from './GenerationError'
import Skeleton from './Skeleton'
import Statement from './Statement'
import { StatementContextProvider } from './StatementContext'

type SectionContentProps = {
  section: TemplateSection
  sectionIndex: number
}

const SectionContent: React.FC<SectionContentProps> = ({ section }) => {
  let deletedStatements = 0

  if (isLoading(section.state) || section.isRegenerating) {
    return <Skeleton itemsCount={3} />
  }

  if (section.state === 'failed') {
    return <GenerationError failedSections={[section]} />
  }

  return (
    <>
      {section.statements.map((statement, idx) => {
        if (statement.isDeleted) deletedStatements++
        return (
          <StatementContextProvider statement={statement} statementIndex={idx - deletedStatements} key={statement.id}>
            <Statement />
          </StatementContextProvider>
        )
      })}
    </>
  )
}

export default SectionContent
