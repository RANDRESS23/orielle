import { useEffect } from "react"
import api from "@/lib/api"
import { useCategories } from "../context/categories-context"

export const useFetchCategories = () => {
  const { categories, setCategories } = useCategories()

  useEffect(() => {
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

  const deleteCategory = async (name: string) => {
    try {
      const response = await api.delete(`/category/${name}`)
      
      if (response.status === 204) {
        const newCategories = categories.filter(category => category.name !== name)
        setCategories(newCategories)
      }

      return true
    } catch (error) {
      console.log(error)
      return false
    }
  }

  return { categories, setCategories, deleteCategory }
}