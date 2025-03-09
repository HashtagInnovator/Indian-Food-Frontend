import axios from "axios"

const API_BASE = "http://localhost:4000/api"

export async function fetchDishes(params = {}) {
  const r = await axios.get(`${API_BASE}/dishes`, { params })
  return r.data
}

export async function fetchDishByName(name) {
  const r = await axios.get(`${API_BASE}/dishes/${name}`)
  return r.data
}

export async function suggestDishes(ingredients) {
  const r = await axios.post(`${API_BASE}/dishes/suggest`, { ingredients })
  return r.data
}

export async function createDish(dishData) {
  const r = await axios.post(`${API_BASE}/dishes`, dishData)
  return r.data
}

export async function updateDish(name, dishData) {
  const r = await axios.put(`${API_BASE}/dishes/${encodeURIComponent(name)}`, dishData)
  return r.data
}

export async function deleteDish(name) {
  const r = await axios.delete(`${API_BASE}/dishes/${encodeURIComponent(name)}`)
  return r.data
}

export async function fetchDishSuggestions(q) {
  const r = await axios.get(`${API_BASE}/dishes`, { params: { search: q, limit: 5 } })
  return r.data.data
}
