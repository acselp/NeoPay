import { useEffect, useMemo, useRef, useState } from 'react'
import {ApiTableStrategyProps, RichTableState, TableSortDirection} from "../../types";
import {GridCommand} from "../../../../services/admin-table-service/types";
import {AdminTableService} from "../../../../services/admin-table-service";
import { debounce } from "../../../../helpers/debounce";

export const useApiTable = <T,>({ entity, schema }: ApiTableStrategyProps<T>): RichTableState<T> => {
    const [data, setData] = useState<[]>([])
    const [page, setPage] = useState(0)
    const [pageSize, setPageSize] = useState(10)
    const [sortCol, setSortCol] = useState<string | null>(null)
    const [sortDir, setSortDir] = useState<TableSortDirection>(TableSortDirection.Asc)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [searchText, setSearchText] = useState<string>('')

    const fetchData = () => {
        setIsLoading(true)
        const buildGridCommand = (): GridCommand => {
            return {
                Entity: entity,
                Search: {
                    SearchQuery: searchText
                },
                Pagination: {
                    PageIndex: page,
                    PageSize: pageSize,
                },
            } as GridCommand
        }

        AdminTableService.search(buildGridCommand())
            .then((res) => {
                setData(res?.data?.Data ?? [])
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const fetchDataWithDebounce = useMemo(() => debounce(fetchData, 300), [])

    useEffect(() => {
        fetchDataWithDebounce()
    }, [page, pageSize, sortCol, sortDir, searchText])

    return {
        data: data,
        isLoading,
        schema,
        search: {
            value: searchText,
            onSearchChange: setSearchText
        },
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
