import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fetchDishByName } from "../services/apiService"
import DishDetails from "../components/DishDetails"
import { motion } from "framer-motion"

export default function DishDetailPage() {
  const { dishName } = useParams()
  const [dish, setDish] = useState(null)

  useEffect(() => {
    const load = async () => {
      const data = await fetchDishByName(dishName)
      setDish(data)
    }
    load()
  }, [dishName])

  if (!dish) return <div className="container"><h2>Loading...</h2></div>

  return (
    <motion.div
      className="container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Dish Detail</h2>
      <DishDetails dish={dish} />
    </motion.div>
  )
}
