import { useMemo, useState } from 'react'
import {
  type FrontendStrategyProps,
  type RichTableState,
  TableSortDirection,
} from '@/components/rich-table/types.ts'

export const useFrontendTable = ({
  data,
}: FrontendStrategyProps): RichTableState => {
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [sortCol, setSortCol] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<TableSortDirection>(
    TableSortDirection.Asc
  )

  // 1. Sort Data locally
  const sortedData = useMemo(() => {
    if (!sortCol) return data
    return [...data].sort((a, b) => {
      if (a[sortCol] < b[sortCol])
        return sortDir === TableSortDirection.Asc ? -1 : 1
      if (a[sortCol] > b[sortCol])
        return sortDir === TableSortDirection.Desc ? -1 : 1
      return 0
    })
  }, [data, sortCol, sortDir])

  // 2. Paginate Data locally
  const paginatedData = useMemo(() => {
    const start = page * pageSize
    return sortedData.slice(start, start + pageSize)
  }, [sortedData, page, pageSize])

  return {
    data: paginatedData as [],
    isLoading: false, // Frontend data is instant
    pagination: {
      pageIndex: page,
      pageSize,
      totalItems: data.length,
      onPageChange: setPage,
      onPageSizeChange: setPageSize,
    },
    sorting: {
      column: sortCol,
      direction: sortDir,
      onSort: (col) => {
        if (sortCol === col)
          setSortDir((prev) =>
            prev === TableSortDirection.Asc
              ? TableSortDirection.Desc
              : TableSortDirection.Asc
          )
        else {
          setSortCol(col)
          setSortDir(TableSortDirection.Asc)
        }
      },
    },
  }
}
