import { UtilityModel } from "../../pages/utility-setup/types";
import { apiSetup } from "../../api-setup";
import {SelectListItem} from "../../models/shared";
import {AxiosResponse} from "axios";

const CONTROLLER_URL = "/api/utility/"
const getUrl = (url: string) => `${CONTROLLER_URL}${url}`

const createEndpoint = "create"
const updateEndpoint = "update"
const deleteEndpoint = "delete"
const getAllAsSelectListItemEndpoint = "GetAllGetAllAsSelectListItem"

export const UtilityService = {
    create(model: UtilityModel) {
        return apiSetup.post(getUrl(createEndpoint), model)
    },
    update(model: UtilityModel) {
        return apiSetup.put(getUrl(updateEndpoint), model)
    },
    delete(id: number) {
        return apiSetup.delete(getUrl(deleteEndpoint), { params: { id } })
    },
    getAllAsSelectList(): Promise<AxiosResponse<SelectListItem[]>> {
        return apiSetup.get(getUrl(getAllAsSelectListItemEndpoint))
    }
}
