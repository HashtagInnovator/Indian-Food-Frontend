import React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, Typography } from "@mui/material"

export default function DishDetails({ dish }) {
  if (!dish) return null
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Card sx={{ maxWidth: 600 }}>
        <CardContent>
          <Typography><strong>Name:</strong> {dish.name}</Typography>
          <Typography><strong>Ingredients:</strong> {dish.ingredients}</Typography>
          <Typography><strong>Diet:</strong> {dish.diet}</Typography>
          <Typography><strong>Prep Time:</strong> {dish.prep_time} minutes</Typography>
          <Typography><strong>Cook Time:</strong> {dish.cook_time} minutes</Typography>
          <Typography><strong>Flavor Profile:</strong> {dish.flavor_profile}</Typography>
          <Typography><strong>Course:</strong> {dish.course}</Typography>
          <Typography><strong>State:</strong> {dish.state}</Typography>
          <Typography><strong>Region:</strong> {dish.region}</Typography>
        </CardContent>
      </Card>
    </motion.div>
  )
}
