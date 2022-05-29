export interface PaginationProps {
  page: number
  count: number
  rowsPerPage: number
  rowsPerPageOptions?: number[]
  onPageChange: (event: any, newPage: number) => void
}
