import React, { useState } from "react"
import DishSuggester from "../components/DishSuggester"
import DishList from "../components/DishList"
import { motion } from "framer-motion"

export default function SuggestPage() {
  const [suggested, setSuggested] = useState([])

  return (
    <motion.div
      className="container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Dish Suggester</h2>
      <DishSuggester onSuggestions={setSuggested} />
      {suggested.length > 0 && (
        <>
          <h3>Suggested Dishes</h3>
          <DishList dishes={suggested} total={suggested.length} page={1} pageSize={suggested.length} />
        </>
      )}
    </motion.div>
  )
}
