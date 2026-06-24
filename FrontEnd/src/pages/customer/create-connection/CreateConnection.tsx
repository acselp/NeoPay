import {Button, Modal, Select} from '../../../components/ui';
import {ConnectionStatus, CreateConnectionModel, CreateConnectionProps, CustomerStatus} from "../types";
import { SubmitHandler, useForm } from "react-hook-form";
import {useEffect, useState} from "react";
import {UtilityService} from "../../../services/utility/utility-service";
import {SelectOption} from "../../../components/ui/types";

export const CreateConnection = ({ active, onClose, onSubmit, customerId }: CreateConnectionProps) => {
    const [utilities, setUtilities] = useState<SelectOption[]>([]);
    const { handleSubmit, register, reset } = useForm<CreateConnectionModel>({
        defaultValues: { CustomerId: customerId }
    });
    const formSubmit: SubmitHandler<CreateConnectionModel> = (data: CreateConnectionModel) => {
        onSubmit?.(data as CreateConnectionModel);
        onClose?.();
    }

    const loadUtilities = () => {
        UtilityService.getAllAsSelectList()
            .then((res) => {
                setUtilities(res.data.map(x => ({ value: x.Value, label: x.Text })));
            })
            .catch((err) => {
                setUtilities([]);
            })
    }

    useEffect(() => {
        loadUtilities();
    }, []);
    
    useEffect(() => {
        if (active) {
            reset({ CustomerId: customerId });
        }
    }, [active, reset]);

    return (
        <>
            <Modal isOpen={active} onClose={onClose} title="Create connection" size="md">
                <form onSubmit={handleSubmit(formSubmit)}>
                    {/* Form fields */}
                    <div className="space-y-4">
                        <input type="number" className="hidden" {...register("CustomerId")} />
                        
                        <Select
                            label="Utility"
                            {...register("UtilityId", { required: "This field is required", valueAsNumber: true })}
                            options={utilities}
                        />

                        <Select
                            label="Status"
                            {...register("Status", { required: "This field is required", valueAsNumber: true })}
                            options={[
                                { value: ConnectionStatus.Active, label: 'Active' },
                                { value: ConnectionStatus.Inactive, label: 'Inactive' },
                            ]}
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
