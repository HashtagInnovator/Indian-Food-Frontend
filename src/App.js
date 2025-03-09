import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import HomePage from "./pages/HomePage"
import DishDetailPage from "./pages/DishDetailPage"
import SuggestPage from "./pages/SuggestPage"
import AdminPage from "./pages/AdminPage"
import Header from "./components/Header"

const theme = createTheme({
  palette: {
    primary: { main: "#6e00c8" },
    secondary: { main: "#ff9800" }
  },
  typography: { fontFamily: "Arial" }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dish/:dishName" element={<DishDetailPage />} />
          <Route path="/suggest" element={<SuggestPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
