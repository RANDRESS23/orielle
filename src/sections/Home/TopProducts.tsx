import api from "@/lib/api"
import { useEffect, useState } from "react"

export const TopProducts = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await api.get('/product')

        if (response.data === null) return

        setProducts(response.data.content)
      } catch (error) {
        console.log(error)
      }
    }

    getProducts()
  }, [])

  return (
    <div>
      {
        products.map(product => (
          <div>{product}</div>
        ))
      }
    </div>
  )
}
