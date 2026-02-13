import { type AxiosPromise } from 'axios'
import { apiSetup } from '@/api-setup'
import {
  type GridCommand,
  type PagedResult,
} from '@/services/admin-table-service/types.ts'

const CONTROLLER_URL = '/api/AdminTable'
const getUrl = (url: string) => `${CONTROLLER_URL}/${url}`

const searchEndpoint = 'Search'

export const AdminTableService = {
  search: (payload: GridCommand): AxiosPromise<PagedResult> => {
    return apiSetup.post(getUrl(searchEndpoint), payload)
  },
}
