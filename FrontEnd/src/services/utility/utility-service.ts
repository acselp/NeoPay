import { apiSetup } from "../../api-setup";
import {AxiosResponse} from "axios";
import {Utility} from "../../pages/utility-setup/types";

const CONTROLLER_URL = "/api/utility/"
const getUrl = (url: string) => `${CONTROLLER_URL}${url}`

const createEndpoint = "create"
const updateEndpoint = "update"
const deleteEndpoint = "delete"
const getAllAsSelectListItemEndpoint = "getAll"

export const UtilityService = {
    create(model: Utility) {
        return apiSetup.post(getUrl(createEndpoint), model)
    },
    update(model: Utility) {
        return apiSetup.put(getUrl(updateEndpoint), model)
    },
    delete(id: number) {
        return apiSetup.delete(getUrl(deleteEndpoint), { params: { id } })
    },
    getAll(): Promise<AxiosResponse<Utility[]>> {
        return apiSetup.get(getUrl(getAllAsSelectListItemEndpoint))
    }
}
