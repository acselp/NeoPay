import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { Button, Input, Modal } from "../../../components/ui";
import { CreateUpdateTariffProps, Tariff } from "../types";

export const CreateUpdateTariff = ({ active, onClose, onSubmit, model, utilityId }: CreateUpdateTariffProps) => {
    const { handleSubmit, register, reset, formState: { errors } } = useForm<Tariff>({
        defaultValues: { UtilityId: utilityId, ...(model ?? {}) },
    });

    useEffect(() => {
        if (active) {
            reset({ UtilityId: utilityId, ...(model ?? {}) });
        }
    }, [active, model, utilityId, reset]);

    const formSubmit: SubmitHandler<Tariff> = (data) => {
        onSubmit?.(data);
        onClose?.();
    };

    return (
        <Modal isOpen={active} onClose={onClose} title={model ? "Edit tariff" : "Create tariff"} size="md">
            <form onSubmit={handleSubmit(formSubmit)}>
                {/* Form fields */}
                <div className="space-y-4">
                    <input type="number" className="hidden" {...register("Id")} />
                    <input type="number" className="hidden" {...register("UtilityId", { valueAsNumber: true })} />

                    <Input
                        label="Title"
                        placeholder="Enter the title"
                        error={errors.Title?.message}
                        {...register("Title", { required: "This field is required" })}
                    />

                    <Input
                        type="number"
                        step="any"
                        label="Unit price"
                        placeholder="Enter the unit price"
                        error={errors.UnitPrice?.message}
                        {...register("UnitPrice", {
                            required: "This field is required",
                            valueAsNumber: true,
                            min: { value: 0, message: "Must be a positive value" },
                        })}
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
    );
};
