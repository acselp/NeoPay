import { useForm } from "react-hook-form"
import { Button, Input, Modal, Select } from "../../../components/ui"
import { CreateUpdatePorps } from "./types"
import { UtilityModel } from "../types"

export const CreateUpdate = ({ onClose, onSubmit, model, active }: CreateUpdatePorps) => {
    const { handleSubmit, register, formState: { errors } } = useForm<UtilityModel>({
        defaultValues: model
    })

    const formSubmit = (data: UtilityModel) => {
        onSubmit?.(data);
        onClose?.();
    }

    return (
        <Modal isOpen={active} onClose={onClose} title="Create customer" size="md">
                <form onSubmit={handleSubmit(formSubmit)}>
                    {/* Form fields */}
                    <div className="space-y-4">
                        <Input
                            label="Utility name"
                            placeholder="Enter utility name"
                            error={errors.Name?.message}
                            {...register("Name", { required: "This field is required" })}
                        />

                        {/*<Select*/}
                        {/*    label="Unit type"*/}
                        {/*    {...register("UnitType")}*/}
                        {/*    options={[*/}
                        {/*        { value: 1, label: 'KWH' },*/}
                        {/*        { value: 0, label: 'M3' },*/}
                        {/*    ]}*/}
                        {/*/>*/}

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
