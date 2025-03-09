import React, { useState } from "react"
import { suggestDishes } from "../services/apiService"
import { TextField, Button, Box, Chip } from "@mui/material"

export default function DishSuggester({ onSuggestions }) {
  const [inputValue, setInputValue] = useState("")
  const [ingredients, setIngredients] = useState([])

  function addIngredient() {
    if (!inputValue.trim()) return
    setIngredients(p => [...p, inputValue.trim()])
    setInputValue("")
  }

  async function handleSuggest() {
    if (!ingredients.length) return
    const r = await suggestDishes(ingredients)
    onSuggestions(r.possibleDishes || [])
  }

  function removeIngredient(i) {
    setIngredients(prev => prev.filter((_, idx) => idx !== i))
  }

  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label="Ingredient"
          variant="outlined"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />
        <Button variant="contained" onClick={addIngredient}>Add</Button>
      </Box>
      <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
        {ingredients.map((ing, i) => (
          <Chip key={i} label={ing} onDelete={() => removeIngredient(i)} />
        ))}
      </Box>
      <Button variant="contained" onClick={handleSuggest} disabled={!ingredients.length}>Suggest</Button>
    </Box>
  )
}
