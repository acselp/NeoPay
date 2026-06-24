import {Button, Input, Modal} from '../../../components/ui';
import type {CreateUpdateProps} from "../types";
import {Unit} from "../types";
import { SubmitHandler, useForm } from "react-hook-form";
import {useEffect} from "react";

export const CreateUpdate = ({ active, onClose, onSubmit, model }: CreateUpdateProps) => {
    const { handleSubmit, register, reset, formState: { errors } } = useForm<Unit>({
        defaultValues: model ?? undefined
    });

    const formSubmit: SubmitHandler<Unit> = (data: Unit) => {
        onSubmit?.(data as Unit);
        onClose?.();
    }

    useEffect(() => {
        if (active) {
            reset(model ?? undefined);
        }
    }, [active, reset]);

    return (
        <Modal isOpen={active} onClose={onClose} title={model ? "Edit unit" : "Create unit"} size="md">
            <form onSubmit={handleSubmit(formSubmit)}>
                {/* Form fields */}
                <div className="space-y-4">
                    <input type="number" className="hidden" {...register("Id")} />

                    <Input
                        label="Code"
                        placeholder="Enter unit code (e.g. KWH)"
                        error={errors.Code?.message}
                        {...register("Code", { required: "This field is required" })}
                    />

                    <Input
                        label="Long name"
                        placeholder="Enter the full unit name (e.g. Kilowatt hour)"
                        error={errors.LongName?.message}
                        {...register("LongName", { required: "This field is required" })}
                    />

                    <Input
                        label="Symbol"
                        placeholder="Enter the unit symbol (e.g. kWh)"
                        error={errors.Symbol?.message}
                        {...register("Symbol", { required: "This field is required" })}
                    />

                    <Input
                        label="Description"
                        placeholder="Enter a short description of the unit"
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
