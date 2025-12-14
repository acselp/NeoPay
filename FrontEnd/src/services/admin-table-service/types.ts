export interface GridCommand {
  Entity: AdminTableEntities
  Search: GridSearch
  Pagination: GridPagination
  Filters: GridFilter[]
}

export interface GridFilter {
  Property: string
  Value: string
}

export interface GridSearch {
  SearchQuery: string
  CaseSensitive: boolean
  Columns: string[]
}

export interface GridPagination {
  PageSize: number
  PageIndex: number
}

export interface PagedResult {
  total: number
  pageIndex: number
  pageSize: number
  data: []
}

export enum AdminTableEntities {
  Customer = 'Customer',
  Utility = 'Utility',
}
