import { type ColumnDef } from '@tanstack/react-table'
import { type AdminTableEntities } from '@/services/admin-table-service/types.ts'

export enum TableStrategy {
  Api = 0,
  Frontend = 1,
}

export interface RichTableState {
  data: []
  isLoading: boolean
  pagination: TablePaginationState
  sorting: TableSortState
  schema: RichTableSchema
}

export interface RichTableSchema {
  columns: ColumnDef<unknown>[]
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

export enum TableSortDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export interface RichTablePropsBase {
  mode: TableStrategy
  schema: RichTableSchema
}

export interface ApiTableStrategyProps extends RichTablePropsBase {
  mode: TableStrategy.Api
  entity: AdminTableEntities
}

export interface FrontendStrategyProps extends RichTablePropsBase {
  mode: TableStrategy.Frontend
  data: []
}

export type RichTableProps = ApiTableStrategyProps | FrontendStrategyProps
