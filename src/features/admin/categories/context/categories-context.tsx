import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { Category } from '../data/schema'

type CategoriesDialogType = 'create' | 'update' | 'delete' | 'import'

interface CategoriesContextType {
  open: CategoriesDialogType | null
  setOpen: (str: CategoriesDialogType | null) => void
  currentRow: Category | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Category | null>>
  categories: Category[]
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>
}

const CategoriesContext = React.createContext<CategoriesContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function CategoriesProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<CategoriesDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Category | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  
  return (
    <CategoriesContext value={{ open, setOpen, currentRow, setCurrentRow, categories, setCategories }}>
      {children}
    </CategoriesContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCategories = () => {
  const categoriesContext = React.useContext(CategoriesContext)

  if (!categoriesContext) {
    throw new Error('useCategories has to be used within <CategoriesContext>')
  }

  return categoriesContext
}
