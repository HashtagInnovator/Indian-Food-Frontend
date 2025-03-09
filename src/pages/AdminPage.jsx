import React, { useState, useEffect } from "react"
import { fetchDishes, createDish, updateDish, deleteDish } from "../services/apiService"
import AdminDishList from "../components/AdminDishList"
import DishForm from "../components/DishForm"
import { motion } from "framer-motion"

export default function AdminPage() {
  const [dishes, setDishes] = useState([])
  const [selectedDish, setSelectedDish] = useState(null)
  const [message, setMessage] = useState("")

  async function load() {
    const data = await fetchDishes({ page: 1, limit: 9999 })
    setDishes(data.data)
  }

  useEffect(() => {
    load()
  }, [])

  async function handleCreate(dishData) {
    try {
      await createDish(dishData)
      setMessage("Dish created")
      load()
    } catch {
      setMessage("Error creating dish")
    }
  }

  async function handleUpdate(dishData) {
    if (!selectedDish) return
    try {
      await updateDish(selectedDish.name, dishData)
      setMessage("Dish updated")
      setSelectedDish(null)
      load()
    } catch {
      setMessage("Error updating dish")
    }
  }

  async function handleDelete(name) {
    try {
      await deleteDish(name)
      setMessage("Dish deleted")
      load()
    } catch {
      setMessage("Error deleting dish")
    }
  }

  return (
    <motion.div
      className="container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Admin Page</h2>
      {message && <p>{message}</p>}
      <DishForm
        onSubmit={selectedDish ? handleUpdate : handleCreate}
        initialData={selectedDish}
        onCancel={() => setSelectedDish(null)}
      />
      <AdminDishList dishes={dishes} onEdit={d => setSelectedDish(d)} onDelete={handleDelete} />
    </motion.div>
  )
}
