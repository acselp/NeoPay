import {Customer} from "../../pages/customer/types";
import {apiSetup} from "../../api-setup";

const CONTROLLER_URL = "/api/customer/"
const getUrl = (url: string) => `${CONTROLLER_URL}${url}`

const createEndpoint = "create"

export const CustomerService = {
    create(model: Customer) {
        return apiSetup.post(getUrl(createEndpoint), model)
    }
}