import { useEffect, useState } from 'react'
import {ApiTableStrategyProps, RichTableState, TableSortDirection} from "../../types";
import {GridCommand} from "../../../../services/admin-table-service/types";
import {AdminTableService} from "../../../../services/admin-table-service";

export const useApiTable = <T,>({ entity, schema }: ApiTableStrategyProps<T>): RichTableState<T> => {
    const [data, setData] = useState<[]>([])
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(10)
    const [sortCol, setSortCol] = useState<string | null>(null)
    const [sortDir, setSortDir] = useState<TableSortDirection>(
        TableSortDirection.Asc
    )
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const fetchData = () => {
        const buildGridCommand = (): GridCommand => {
            return {
                Entity: entity,
                Pagination: {
                    PageIndex: page,
                    PageSize: pageSize,
                },
            } as GridCommand
        }

        setIsLoading(true)
        AdminTableService.search(buildGridCommand())
            .then((res) => {
                setData(res?.data?.Data ?? [])
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    useEffect(() => {
        fetchData()
    }, [page, pageSize, sortCol, sortDir])

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
