import React from "react"
import TablePagination from "@mui/material/TablePagination"
import { PaginationProps } from "../@types/Pagination"

const Pagination: React.FC<PaginationProps> = ({
  page,
  count,
  rowsPerPage,
  rowsPerPageOptions = [],
  onPageChange
}) => {
  return (
    <TablePagination
      component="div"
      rowsPerPageOptions={rowsPerPageOptions}
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={onPageChange}
    />
  )
}

export default Pagination
