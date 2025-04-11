import { useEffect, useState } from "react"
import api from "@/lib/api"
import { useProducts } from "../context/products-context"
import { Category } from "../../categories/data/schema"

export const useFetchProducts = () => {
  const { products, setProducts } = useProducts()
  const [categories, setCategories] = useState<Category[]>([])

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await api.get('/product/all')
        
        if (response.data === null) return

        setProducts(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    getProducts()

    const getCategories = async () => {
      try {
        const response = await api.get('/category/all')
        
        if (response.data === null) return

        setCategories(response.data)
      } catch (error) {
        console.log(error)
      }
    }

    getCategories()
  }, [])

  const deleteProduct = async (name: string) => {
    try {
      const response = await api.delete(`/product/${name}`)
      
      if (response.status === 204) {
        const newProducts = products.filter(product => product.name !== name)
        setProducts(newProducts)
      }

      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  return { products, setProducts, deleteProduct, categories }
}