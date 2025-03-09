import React from "react"
import { Table, TableHead, TableBody, TableRow, TableCell, Button } from "@mui/material"

export default function AdminDishList({ dishes, onEdit, onDelete }) {
  if (!dishes.length) return <p>No dishes available</p>
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Diet</TableCell>
          <TableCell>Prep Time</TableCell>
          <TableCell>Cook Time</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {dishes.map((dish, index) => (
          <TableRow key={index}>
            <TableCell>{dish.name}</TableCell>
            <TableCell>{dish.diet}</TableCell>
            <TableCell>{dish.prep_time} min</TableCell>
            <TableCell>{dish.cook_time} min</TableCell>
            <TableCell>
              <Button variant="outlined" sx={{ mr: 1 }} onClick={() => onEdit(dish)}>Edit</Button>
              <Button variant="contained" color="error" onClick={() => onDelete(dish.name)}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
