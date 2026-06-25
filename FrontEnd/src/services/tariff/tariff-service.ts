import { apiSetup } from "../../api-setup";
import { AxiosResponse } from "axios";
import { Tariff } from "../../pages/utility/types";

const CONTROLLER_URL = "/api/tariff/"
const getUrl = (url: string) => `${CONTROLLER_URL}${url}`

const createEndpoint = "create"
const updateEndpoint = "update"
const deleteEndpoint = "delete"
const getByIdEndpoint = "getById"
const getAllEndpoint = "getAll"

export const TariffService = {
    create(model: Tariff) {
        return apiSetup.post(getUrl(createEndpoint), model)
    },
    update(model: Tariff) {
        return apiSetup.put(getUrl(updateEndpoint), model)
    },
    delete(id: number) {
        return apiSetup.delete(getUrl(deleteEndpoint), { params: { id } })
    },
    getById(id: number): Promise<AxiosResponse<Tariff>> {
        return apiSetup.get(getUrl(getByIdEndpoint), { params: { id } })
    },
    getAll(): Promise<AxiosResponse<Tariff[]>> {
        return apiSetup.get(getUrl(getAllEndpoint))
    }
}
