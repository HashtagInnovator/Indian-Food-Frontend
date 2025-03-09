import React, { useCallback } from "react"
import { DataGrid } from "@mui/x-data-grid"
import { motion } from "framer-motion"


export default function DishList({
  dishes,
  total,
  page,
  pageSize,
  onSortChange,
  onPageChange,
  onPageSizeChange
}) {
  const columns = [
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      sortable: true,
      renderCell: params => (
        <a href={`/dish/${encodeURIComponent(params.value)}`} style={{ color: "#6e00c8" }}>
          {params.value}
        </a>
      )
    },
    { field: "diet", headerName: "Diet", flex: 1, sortable: true },
    { field: "prep_time", headerName: "Prep Time (min)", type: "number", flex: 1, sortable: true },
    { field: "cook_time", headerName: "Cook Time (min)", type: "number", flex: 1, sortable: true },
    { field: "state", headerName: "State", flex: 1, sortable: true }
  ]
  const rows = dishes.map((d, i) => ({ id: i, ...d }))

  const handleSortModelChange = useCallback(
    m => {
      if (m.length === 0) {
        onSortChange("", "asc")
        return
      }
      const { field, sort } = m[0]
      if (!sort) {
        onSortChange("", "asc")
      } else {
        onSortChange(field, sort)
      }
    },
    [onSortChange]
  )

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div style={{ width: "100%", background: "#fff", borderRadius: 4 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pagination
          // autoPageSize
          disableColumnMenu
        // sortingMode="server"
        onSortModelChange={handleSortModelChange}
        page={page - 1}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10, 20]}
        />
      </div>
    </motion.div>
  )
}
