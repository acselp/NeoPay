import { useEffect, useState } from 'react'
import { AdminTableService } from '@/services/admin-table-service'
import { type GridCommand } from '@/services/admin-table-service/types.ts'
import {
  type ApiTableStrategyProps,
  type RichTableState,
  TableSortDirection,
} from '@/components/rich-table/types.ts'

export const useApiTable = ({
  entity,
  schema,
}: ApiTableStrategyProps): RichTableState => {
  const [data, setData] = useState<[]>([])
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [sortCol, setSortCol] = useState<string | null>(null)
  const [sortDir, setSortDir] = useState<TableSortDirection>(
    TableSortDirection.Asc
  )
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    const buildGridCommand = (): GridCommand => {
      return {
        Entity: entity,
        Pagination: {
          PageIndex: page,
          PageSize: pageSize,
        },
      } as GridCommand
    }

    const fetchData = () => {
      setIsLoading(true)
      AdminTableService.search(buildGridCommand())
        .then((res) => {
          setData(res.data.data)
        })
        .finally(() => {
          setIsLoading(false)
        })
    }

    fetchData()
  }, [page, sortCol, sortDir, entity, pageSize])

  return {
    data: data,
    isLoading,
    schema,
    pagination: {
      pageIndex: page,
      pageSize,
      totalItems: data?.length ?? 0,
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
