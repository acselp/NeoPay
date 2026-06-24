import { UtilityModel } from "../types"

export interface CreateUpdateProps {
    active: boolean
    onClose: () => void
    onSubmit?: (model: UtilityModel) => void
    model?: UtilityModel | null
}
