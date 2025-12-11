import { post } from '@/lib/api-client'
import {
  type GetCustomerFilterModel,
  type PagedResultModel,
  type CustomerModel,
} from '@/lib/types/api-types'

export const CustomerService = {
  /**
   * Get all customers with pagination, filtering, and sorting
   * @param filter - The filter model with PascalCase properties
   * @returns Promise with PagedResultModel<CustomerModel>
   */
  getAllPaginated: async (
    filter: GetCustomerFilterModel
  ): Promise<PagedResultModel<CustomerModel>> => {
    return await post<PagedResultModel<CustomerModel>, GetCustomerFilterModel>(
      '/Customer/GetAll',
      filter
    )
  },
}
