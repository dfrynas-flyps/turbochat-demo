import React, { useContext } from 'react'

import { checkSectionSoftDeleted } from '../helpers'
import { TemplateSection } from '../types/editor'

type SectionContextProps = {
  section: TemplateSection
  sectionIndex: number
  isSectionSoftDeleted?: boolean
}

type SectionContextProviderProps = SectionContextProps & {
  children: React.ReactNode
}

const SectionContext = React.createContext<SectionContextProps>({} as SectionContextProps)

export const SectionContextProvider: React.FC<SectionContextProviderProps> = ({ section, children, sectionIndex }) => {
  const isSectionSoftDeleted = checkSectionSoftDeleted(section)

  return (
    <SectionContext.Provider value={{ section, isSectionSoftDeleted, sectionIndex }}>
      {/* NOTE: If you wrap children with any kind of container, it's going to break sections DnD, and "Add new section" button in sidebar */}
      {children}
    </SectionContext.Provider>
  )
}

export const useSectionContext = () => {
  const context = useContext(SectionContext)

  if (!context) {
    throw new Error('useSectionContext must be used within SectionContext')
  }
  return context
}
