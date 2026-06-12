import { Utility } from "../../../types"
import { UtilityModel } from "../types"

export interface CreateUpdatePorps {
    onSubmit: any
    onClose: any
    model: UtilityModel
    active: boolean
}