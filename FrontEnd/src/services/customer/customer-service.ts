import {Customer} from "../../pages/customer/types";
import {apiSetup} from "../../api-setup";

const CONTROLLER_URL = "/api/customer/"
const getUrl = (url: string) => `${CONTROLLER_URL}${url}`

const createEndpoint = "create"
const updateEndpoint = "update"
const deleteEndpoint = "delete"
const getByIdEndpoint = "getById"

export const CustomerService = {
    create(model: Customer) {
        return apiSetup.post(getUrl(createEndpoint), model)
    },
    update(model: Customer) {
        return apiSetup.put(getUrl(updateEndpoint), model)
    },
    delete(id: number) {
        return apiSetup.delete(getUrl(deleteEndpoint), { params: { id } })
    },
    getById(id: string) {
        return apiSetup.get(getUrl(getByIdEndpoint), { params: { id } })
    }
}
