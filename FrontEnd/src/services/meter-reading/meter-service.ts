import {apiSetup} from "../../api-setup";
import {Meter} from "../../pages/meter/types";
import {AxiosPromise, AxiosResponse} from "axios";
import { MeterReadingCreateModel, MeterReadingListModel } from "../../pages/meter-reading/types";

const CONTROLLER_URL = "/api/meterreading/"
const getUrl = (url: string) => `${CONTROLLER_URL}${url}`

const createEndpoint = "create"
const getAllEndpoint = "getAll"

export const MeterReadingService = {
    create(model: MeterReadingCreateModel) {
        return apiSetup.post(getUrl(createEndpoint), model)
    },
    getAll(): Promise<AxiosResponse<MeterReadingListModel[]>> {
        return apiSetup.get(getUrl(getAllEndpoint))
    },
}
