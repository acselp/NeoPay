import {SubmitHandler, useForm} from "react-hook-form"
import {useEffect, useMemo, useState} from "react"
import {Button, Input, Modal, Select} from "../../../components/ui"
import {BillingType, CreateUpdateProps} from "./types"
import {Utility} from "../types"
import {Unit} from "../../unit/types"
import {UnitService} from "../../../services/unit/unit-service"

export const CreateUpdate = ({ onClose, onSubmit, model, active }: CreateUpdateProps) => {
    const { handleSubmit, register, reset, setValue, formState: { errors } } = useForm<Utility>({
        defaultValues: {
            ...model ?? undefined
        },
    })

    const [selectedBillingType, setSelectedBillingType] = useState(BillingType.FixedRecurring)
    const [units, setUnits] = useState<Unit[]>([])

    useEffect(() => {
        if (!active) return
        UnitService.getAll()
            .then((res) => setUnits(res.data ?? []))
            .catch(() => setUnits([]))
    }, [active])

    useEffect(() => {
        if (active) {
            reset(model ?? undefined)
        }
    }, [active, reset])

    // Re-apply the selected unit once the options have loaded (edit case).
    useEffect(() => {
        if (active && model?.UnitId && units.length) {
            setValue("UnitId", model.UnitId)
        }
    }, [active, units, model, setValue])

    const unitOptions = useMemo(
        () => units.map((unit) => ({
            value: `${unit.Id}`,
            label: `${unit.LongName} (${unit.Symbol})`,
        })),
        [units]
    )

    const formSubmit: SubmitHandler<Utility> = (data) => {
        onSubmit?.(data)
        onClose?.()
    }

    return (
        <Modal isOpen={active} onClose={onClose} title={model ? "Edit utility" : "Create utility"} size="md">
            <form onSubmit={handleSubmit(formSubmit)}>
                {/* Form fields */}
                <div className="space-y-4">
                    <input type="number" className="hidden" {...register("Id")} />
                    <Input
                        label="Utility name"
                        placeholder="Enter utility name"
                        error={errors.Name?.message}
                        {...register("Name", { required: "This field is required" })}
                    />

                    <Select
                        label="Billing type"
                        placeholder="Select billing type"
                        error={errors.BillingType?.message}
                        options={[
                            {
                                label: "Metered",
                                value: BillingType.Metered
                            },
                            {
                                label: "Fixed recurring",
                                value: BillingType.FixedRecurring
                            }
                        ]}
                        {...register("BillingType", {
                            valueAsNumber: true,
                            required: "This field is required"
                        })}
                        onChange={(event) => setSelectedBillingType(Number(event.target.value))}
                    />

                    {
                        selectedBillingType == BillingType.Metered && (<Select
                            label="Unit"
                            placeholder="Select a unit"
                            error={errors.UnitId?.message}
                            options={unitOptions}
                            {...register("UnitId", {
                                valueAsNumber: true,
                                validate: (value) =>
                                    (!!value && value > 0) || "This field is required",
                            })}
                        />)
                    }
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
                    <Button variant="secondary" type="button" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button type="submit">
                        Save
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
