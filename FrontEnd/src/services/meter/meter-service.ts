import {apiSetup} from "../../api-setup";
import {Meter} from "../../pages/meter/types";
import {AxiosPromise, AxiosResponse} from "axios";

const CONTROLLER_URL = "/api/meter/"
const getUrl = (url: string) => `${CONTROLLER_URL}${url}`

const createEndpoint = "create"
const updateEndpoint = "update"
const deleteEndpoint = "delete"
const getAllEndpoint = "getAll"
const getByIdEndpoint = "getById"

export const MeterService = {
    create(model: Meter) {
        return apiSetup.post(getUrl(createEndpoint), model)
    },
    getAll(): Promise<AxiosResponse<Meter[]>> {
        return apiSetup.get(getUrl(getAllEndpoint))
    },
    update(model: Meter) {
        return apiSetup.put(getUrl(updateEndpoint), model)
    },
    delete(id: number) {
        return apiSetup.delete(getUrl(deleteEndpoint), { params: { id } })
    },
    getById(id: string) {
        return apiSetup.get(getUrl(getByIdEndpoint), { params: { id } })
    }
}
