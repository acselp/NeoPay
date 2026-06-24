import {CreateConnectionModel, Customer} from "../../pages/customer/types";
import {apiSetup} from "../../api-setup";

const CONTROLLER_URL = "/api/connection/"
const getUrl = (url: string) => `${CONTROLLER_URL}${url}`

const createEndpoint = "create"

export const ConnectionService = {
    create(model: CreateConnectionModel) {
        return apiSetup.post(getUrl(createEndpoint), model)
    },
}
