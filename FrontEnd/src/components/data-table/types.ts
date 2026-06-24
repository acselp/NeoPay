import { ColumnDef } from "@tanstack/react-table";
import {AdminTableEntities, GridFilter} from "../../services/admin-table-service/types";

export enum TableStrategy {
    Api = 0,
    Frontend = 1,
}

export interface RichTableState<T> {
    data: []
    isLoading: boolean
    pagination: TablePaginationState
    search: TableSearchState
    sorting: TableSortState
    schema: RichTableSchema<T>
}



export interface RichTableSchema<T> {
    columns: ColumnDef<T, any>[],
    table: TableConfig<T>
}

export interface TableConfig<T> {
    row: RowConfig<T>
}

export interface RowConfig<T> {
    onRowClick: (row: T) => void,
}

export interface TablePaginationState {
    pageIndex: number
    pageSize: number
    totalItems: number
    onPageChange: (page: number) => void
    onPageSizeChange: (page: number) => void
}

export interface TableSortState {
    column: string | null
    direction: TableSortDirection
    onSort: (column: string, direction: TableSortDirection) => void
}

export interface TableSearchState {
    value: string
    onSearchChange: (value: string) => void
}

export enum TableSortDirection {
    Asc = 'asc',
    Desc = 'desc',
}

export interface RichTablePropsBase<T> {
    mode: TableStrategy
    schema: RichTableSchema<T>
}

export interface ApiTableStrategyProps<T> extends RichTablePropsBase<T> {
    mode: TableStrategy.Api
    entity: AdminTableEntities
    filters?: GridFilter[]
}

export interface FrontendStrategyProps<T> extends RichTablePropsBase<T> {
    mode: TableStrategy.Frontend
    data: []
}

export type RichTableProps<T> = ApiTableStrategyProps<T> | FrontendStrategyProps<T>
