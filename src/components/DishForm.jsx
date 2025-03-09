import React, { useState, useEffect } from "react"
import { TextField, Button, Box, Typography, Card, CardContent } from "@mui/material"

export default function DishForm({ onSubmit, initialData, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    ingredients: "",
    diet: "",
    prep_time: "",
    cook_time: "",
    flavor_profile: "",
    course: "",
    state: "",
    region: ""
  })

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        prep_time: initialData.prep_time.toString(),
        cook_time: initialData.cook_time.toString()
      })
    } else {
      setFormData({
        name: "",
        ingredients: "",
        diet: "",
        prep_time: "",
        cook_time: "",
        flavor_profile: "",
        course: "",
        state: "",
        region: ""
      })
    }
  }, [initialData])

  function handleChange(e) {
    const { name, value } = e.target
    setFormData(p => ({ ...p, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <Card sx={{ mb: 3, maxWidth: 600 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2 }}>{initialData ? "Edit Dish" : "Create New Dish"}</Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField label="Name" name="name" value={formData.name} onChange={handleChange} required />
          <TextField label="Ingredients" name="ingredients" value={formData.ingredients} onChange={handleChange} />
          <TextField label="Diet" name="diet" value={formData.diet} onChange={handleChange} />
          <TextField label="Prep Time" name="prep_time" type="number" value={formData.prep_time} onChange={handleChange} />
          <TextField label="Cook Time" name="cook_time" type="number" value={formData.cook_time} onChange={handleChange} />
          <TextField label="Flavor Profile" name="flavor_profile" value={formData.flavor_profile} onChange={handleChange} />
          <TextField label="Course" name="course" value={formData.course} onChange={handleChange} />
          <TextField label="State" name="state" value={formData.state} onChange={handleChange} />
          <TextField label="Region" name="region" value={formData.region} onChange={handleChange} />
          <Box>
            <Button variant="contained" type="submit" sx={{ mr: 2 }}>
              {initialData ? "Update Dish" : "Create Dish"}
            </Button>
            {initialData && <Button variant="outlined" onClick={onCancel}>Cancel</Button>}
          </Box>
        </Box>
      </CardContent>
    </Card>
  )
}
