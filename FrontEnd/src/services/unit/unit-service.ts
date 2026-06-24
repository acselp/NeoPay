import {Unit} from "../../pages/unit/types";
import {apiSetup} from "../../api-setup";

const CONTROLLER_URL = "/api/unit/"
const getUrl = (url: string) => `${CONTROLLER_URL}${url}`

const createEndpoint = "create"
const updateEndpoint = "update"
const deleteEndpoint = "delete"
const getAllEndpoint = "getAll"
const getByIdEndpoint = "getById"

export const UnitService = {
    create(model: Unit) {
        return apiSetup.post(getUrl(createEndpoint), model)
    },
    getAll() {
        return apiSetup.get<Unit[]>(getUrl(getAllEndpoint))
    },
    update(model: Unit) {
        return apiSetup.put(getUrl(updateEndpoint), model)
    },
    delete(id: number) {
        return apiSetup.delete(getUrl(deleteEndpoint), { params: { id } })
    },
    getById(id: string) {
        return apiSetup.get(getUrl(getByIdEndpoint), { params: { id } })
    }
}
