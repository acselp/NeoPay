import { UtilityModel } from "../../pages/utility-setup/types";
import { apiSetup } from "../../api-setup";

const CONTROLLER_URL = "/api/utility/"
const getUrl = (url: string) => `${CONTROLLER_URL}${url}`

const createEndpoint = "create"

export const UtilityService = {
    create(model: UtilityModel) {
        return apiSetup.post(getUrl(createEndpoint), model)
    }
}
