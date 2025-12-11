// API types matching backend models with PascalCase naming convention

export interface GetCustomerFilterModel {
  PageIndex: number
  PageSize: number
  SortField?: string
  SortDirection?: 'asc' | 'desc'
  SearchTerm?: string
  FirstName?: string
  LastName?: string
  Email?: string
  Phone?: string
  AccountNr?: number
}

export interface CustomerModel {
  Id: number
  FirstName: string
  LastName: string
  Email?: string
  Phone?: string
  AccountNr: number
}

export interface PagedResultModel<T> {
  Total: number
  PageIndex: number
  PageSize: number
  TotalPages: number
  Data: T[]
}
