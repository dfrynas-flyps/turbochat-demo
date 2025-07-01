import React, { useContext, useMemo } from 'react'

import { useAppSelector } from '../hooks/redux'
import { selectActiveStatement } from '../redux/selectors'
import { TemplateStatement } from '../types/editor'

type StatementContextBase = {
  statement: TemplateStatement
  statementIndex: number
}

type StatementContextProps = StatementContextBase & {
  isStatementActive: boolean
}

type StatementContextProviderProps = StatementContextBase & {
  children: React.ReactNode
}

const StatementContext = React.createContext<StatementContextProps>({} as StatementContextProps)

export const StatementContextProvider: React.FC<StatementContextProviderProps> = ({
  statement,
  statementIndex,
  children,
}) => {
  const activeStatement = useAppSelector(selectActiveStatement)

  const isStatementActive = useMemo(() => {
    return activeStatement?.id === statement.id
  }, [activeStatement, statement])

  return (
    <StatementContext.Provider value={{ statement, statementIndex, isStatementActive }}>
      {/* NOTE: If you wrap children with any kind of container, it's going to break statements DnD in sidebar */}
      {children}
    </StatementContext.Provider>
  )
}

export const useStatementContext = () => {
  const context = useContext(StatementContext)

  if (!context) {
    throw new Error('useStatementContext must be used within StatementContext')
  }
  return context
}
