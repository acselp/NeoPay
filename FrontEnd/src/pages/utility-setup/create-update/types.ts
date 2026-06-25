import { Utility } from "../types"

export interface CreateUpdateProps {
    active: boolean
    onClose: () => void
    onSubmit?: (model: Utility) => void
    model?: Utility | null
}

export enum BillingType {
    Metered = 0,
    FixedRecurring = 1
}
