import {GridCommand, PagedResult} from "./types";
import {AxiosPromise} from "axios";
import {apiSetup} from "../../api-setup";

const CONTROLLER_URL = 'http://localhost:8081/api/AdminTable'
const getUrl = (url: string) => `${CONTROLLER_URL}/${url}`

const searchEndpoint = 'Search'

export const AdminTableService = {
    search: (payload: GridCommand): AxiosPromise<PagedResult> => {
        return apiSetup.post(getUrl(searchEndpoint), payload)
    },
}