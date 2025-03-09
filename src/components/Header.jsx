import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { fetchDishSuggestions } from "../services/apiService"
import { motion, AnimatePresence } from "framer-motion"
import { AppBar, Toolbar, Typography, Box, TextField } from "@mui/material"

export default function Header() {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([])
      return
    }
    const t = setTimeout(async () => {
      const s = await fetchDishSuggestions(query)
      setSuggestions(s)
    }, 300)
    return () => clearTimeout(t)
  }, [query])

  function handleSelect(name) {
    setQuery("")
    setSuggestions([])
    navigate(`/dish/${encodeURIComponent(name)}`)
  }

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", gap: 2 }}>
        <Box sx={{ display: "flex", gap: 3 }}>
          <Typography variant="h6">
            <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>Home</Link>
          </Typography>
          <Typography variant="h6">
            <Link to="/suggest" style={{ color: "#fff", textDecoration: "none" }}>Suggest</Link>
          </Typography>
          <Typography variant="h6">
            <Link to="/admin" style={{ color: "#fff", textDecoration: "none" }}>Admin</Link>
          </Typography>
        </Box>
        <Box sx={{ flex: 1 }} />
        <Box sx={{ position: "relative" }}>
          <TextField
            size="small"
            placeholder="Search dishes..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            sx={{ bgcolor: "#fff", borderRadius: 1, width: 200 }}
          />
          <AnimatePresence>
            {suggestions.length > 0 && (
              <motion.ul
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                style={{
                  position: "absolute",
                  background: "#fff",
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  width: "100%",
                  border: "1px solid #ccc",
                  zIndex: 999
                }}
              >
                {suggestions.map((d, i) => (
                  <motion.li
                    key={i}
                    whileHover={{ backgroundColor: "#f0f0f0" }}
                    style={{ padding: "8px", cursor: "pointer", color: "#000" }}
                    onClick={() => handleSelect(d.name)}
                  >
                    {d.name}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
