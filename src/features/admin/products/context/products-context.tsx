import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { Product } from '../data/schema'

type ProductsDialogType = 'create' | 'update' | 'delete' | 'import'

interface ProductsContextType {
  open: ProductsDialogType | null
  setOpen: (str: ProductsDialogType | null) => void
  currentRow: Product | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Product | null>>
  products: Product[]
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>
}

const ProductsContext = React.createContext<ProductsContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function ProductsProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<ProductsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Product | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  
  return (
    <ProductsContext value={{ open, setOpen, currentRow, setCurrentRow, products, setProducts }}>
      {children}
    </ProductsContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = () => {
  const productsContext = React.useContext(ProductsContext)

  if (!productsContext) {
    throw new Error('useProducts has to be used within <ProductsContext>')
  }

  return productsContext
}
