import {Button, Input, Modal, Select} from '../../../components/ui';
import type {CreateUpdateProps} from "../types";
import {Customer, CustomerStatus} from "../types";
import { SubmitHandler, useForm } from "react-hook-form";
import { RegexConstants } from "../../../constants/regex";
import {useEffect} from "react";

export const CreateUpdate = ({ active, onClose, onSubmit, model }: CreateUpdateProps) => {
    const { handleSubmit, register, reset, formState: { errors } } = useForm<Customer>({
        defaultValues: model
    });
    const formSubmit: SubmitHandler<Customer> = (data: Customer) => {
        onSubmit?.(data as Customer);
        onClose?.();
    }

    useEffect(() => {
        if (active) {
            reset(model);
        }
    }, [active, reset]);
    
    return (
        <>
            <Modal isOpen={active} onClose={onClose} title="Create customer" size="md">
                <form onSubmit={handleSubmit(formSubmit)}>
                    {/* Form fields */}
                    <div className="space-y-4">
                        <input type="number" className="hidden" {...register("Id")} />
                        <Input
                            label="First Name"
                            placeholder="Enter customer first name"
                            error={errors.FirstName?.message}
                            {...register("FirstName", { required: "This field is required" })}
                        />

                        <Input
                            label="Last Name"
                            placeholder="Enter customer last name"
                            error={errors.LastName?.message}
                            {...register("LastName", { required: "This field is required" })}
                        />

                        <Input
                            label="Email"
                            placeholder="Enter customer email"
                            error={errors.Email?.message}
                            {...register("Email",
                                {
                                    pattern: {
                                        value: RegexConstants.email,
                                        message: "Invalid email address"
                                    }
                                })}

                        />

                        <Input
                            label="Phone number"
                            placeholder="Enter customer phone number"
                            error={errors.Phone?.message}
                            {...register("Phone", { required: "This field is required" })}

                        />

                        <Input
                            type="number"
                            label="Account Number"
                            placeholder="Enter account number of the customer"
                            error={errors.AccountNr?.message}
                            {...register("AccountNr", { required: "This field is required" })}

                        />

                        <Select
                            label="Status"
                            {...register("Status", { required: "This field is required", valueAsNumber: true })}
                            options={[
                                {value: CustomerStatus.Active, label: 'Active'},
                                {value: CustomerStatus.Inactive, label: 'Inactive'},
                            ]}
                        />

                        <Input
                            label="Notes"
                            placeholder="Enter some notes about the customer"
                            error={errors.Notes?.message}
                            {...register("Notes")}
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
        </>
    )
}
