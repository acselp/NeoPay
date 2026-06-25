import {Button, Input, Modal, Select} from '../../../components/ui';
import {CreateUpdateProps, Meter, MeterStatus} from "../types";
import { SubmitHandler, useForm } from "react-hook-form";
import {useEffect} from "react";

export const CreateUpdate = ({ active, onClose, onSubmit, model }: CreateUpdateProps) => {
    const { handleSubmit, register, reset, formState: { errors } } = useForm<Meter>({
        defaultValues: model ?? undefined
    });

    const formSubmit: SubmitHandler<Meter> = (data: Meter) => {
        onSubmit?.(data as Meter);
        onClose?.();
    }

    useEffect(() => {
        if (active) {
            reset(model ?? undefined);
        }
    }, [active, reset]);

    return (
        <Modal isOpen={active} onClose={onClose} title={model ? "Edit meter" : "Create meter"} size="md">
            <form onSubmit={handleSubmit(formSubmit)}>
                {/* Form fields */}
                <div className="space-y-4">
                    <input type="number" className="hidden" {...register("Id")} />

                    <Input
                        label="Serial number"
                        placeholder="Enter serial number"
                        error={errors.SerialNumber?.message}
                        {...register("SerialNumber", { required: "This field is required" })}
                    />

                    <Select
                        label="Status"
                        {...register("Status", { required: "This field is required", valueAsNumber: true })}
                        options={[
                            {value: MeterStatus.Active, label: 'Active'},
                            {value: MeterStatus.Inactive, label: 'Inactive'},
                        ]}
                    />

                    <Input
                        label="Description"
                        placeholder="Enter the Description"
                        error={errors.Description?.message}
                        {...register("Description")}
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
