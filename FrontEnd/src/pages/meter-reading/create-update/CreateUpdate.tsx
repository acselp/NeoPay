import {Button, Input, Modal, Select} from '../../../components/ui';
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { CreateUpdateProps, MeterReadingCreateModel } from "../types";
import { MeterService } from "../../../services/meter/meter-service";
import { SelectOption } from "../../../components/ui/types";

export const CreateUpdate = ({ active, onClose, onSubmit, model }: CreateUpdateProps) => {
    const { handleSubmit, register, reset, formState: { errors } } = useForm<MeterReadingCreateModel>();
    const [meters, setMeters] = useState<SelectOption[]>([]);

    const formSubmit: SubmitHandler<MeterReadingCreateModel> = (data: MeterReadingCreateModel) => {
        onSubmit?.(data as MeterReadingCreateModel);
        onClose?.();
    }

    const loadMeters = () => {
        MeterService.getAll()
            .then(x => {
                setMeters(x.data.map(x => ({
                    label: x.SerialNumber,
                    value: x.Id,
                })))
            })
    }

    const resetIfActiveForm = () => {
        if (active) {
            reset(model ?? undefined);
        }
    }

    useEffect(() => {
        resetIfActiveForm();
        loadMeters()
    }, [active, reset]);

    return (
        <Modal isOpen={active} onClose={onClose} title={model ? "Edit meter" : "Create meter"} size="md">
            <form onSubmit={handleSubmit(formSubmit)}>
                {/* Form fields */}
                <div className="space-y-4">
                    <Select
                        label="Meter"
                        placeholder="Select the meter"
                        {...register("MeterId", { required: "This field is required", valueAsNumber: true })}
                        options={meters}
                    />

                    <Input
                        label="Value"
                        type="number"
                        placeholder="Enter the reading value"
                        error={errors.Value?.message}
                        {...register("Value", { valueAsNumber: true, required: "This field is required" })}
                    />
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
