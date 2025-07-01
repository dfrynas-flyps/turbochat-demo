import { createContext, useCallback, useContext } from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { TemplateStatement } from '../types/editor'

type StatementHistoryContextType = {
  addEntry: (statementId: TemplateStatement['id'], newEntry: TemplateStatement) => void
  getLatestEntry: (statementId: TemplateStatement['id']) => TemplateStatement | null
  deleteLatestEntry: (statementId: TemplateStatement['id']) => void
}

type StatementHistory = Record<TemplateStatement['id'], TemplateStatement[]>

type StatementHistoryManagerProps = {
  children: React.ReactNode
}

const StatementHistoryContext = createContext<StatementHistoryContextType>({} as StatementHistoryContextType)

const STORAGE_KEY = 'StatementHistoryManager'

/**
 * I created this manager to keep a short track of TemplateStatement state updates,
 * because I needed a convenient way to roll-back to a previous state.
 *
 * In the future though, it could be adapted to be more sophisticated than that.
 */
export const StatementHistoryManager: React.FC<StatementHistoryManagerProps> = ({ children }) => {
  const [statementHistory, setStatementHistory] = useLocalStorage<StatementHistory>(STORAGE_KEY, {})

  const addEntry = useCallback(
    (statementId: TemplateStatement['id'], newEntry: TemplateStatement) => {
      setStatementHistory((prevHistory) => {
        const previousEntries = prevHistory[statementId] ?? []
        return {
          ...prevHistory,
          [statementId]: [newEntry, ...previousEntries],
        }
      })
    },
    [setStatementHistory]
  )

  const getLatestEntry = useCallback(
    (statementId: TemplateStatement['id']): TemplateStatement | null => {
      const allEntries = statementHistory[statementId] ?? []
      return allEntries[0] ?? null
    },
    [statementHistory]
  )

  const deleteLatestEntry = useCallback(
    (statementId: TemplateStatement['id']) => {
      setStatementHistory((prevHistory) => {
        return {
          ...prevHistory,
          [statementId]: prevHistory[statementId].slice(1),
        }
      })
    },
    [setStatementHistory]
  )

  return (
    <StatementHistoryContext.Provider
      value={{
        addEntry,
        getLatestEntry,
        deleteLatestEntry,
      }}
    >
      {children}
    </StatementHistoryContext.Provider>
  )
}

export const useStatementHistoryManager = () => {
  const context = useContext(StatementHistoryContext)
  if (!context) {
    throw new Error('`useStatementHistoryManager` must be used within StatementHistoryContext')
  }
  return context
}
