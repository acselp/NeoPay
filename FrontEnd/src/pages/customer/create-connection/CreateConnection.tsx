import {Button, Input, Modal, Select} from '../../../components/ui';
import {ConnectionStatus, CreateConnectionModel, CreateConnectionProps, CustomerStatus} from "../types";
import { SubmitHandler, useForm } from "react-hook-form";
import {useEffect, useState} from "react";
import {UtilityService} from "../../../services/utility/utility-service";
import {Meter} from "../../meter/types";
import {Utility} from "../../utility-setup/types";
import {MeterService} from "../../../services/meter/meter-service";
import {SelectOption} from "../../../components/ui/types";
import {BillingType} from "../../utility-setup/create-update/types";

export const CreateConnection = ({ active, onClose, onSubmit, customerId }: CreateConnectionProps) => {
    const [utilities, setUtilities] = useState<Utility[]>([]);
    const [meters, setMeters] = useState<SelectOption[]>([]);
    const [selectedUtility, setSelectedUtilities] = useState<Utility>(null);
    
    const { handleSubmit, register, reset } = useForm<CreateConnectionModel>({
        defaultValues: { CustomerId: customerId }
    });
    const formSubmit: SubmitHandler<CreateConnectionModel> = (data: CreateConnectionModel) => {
        onSubmit?.(data as CreateConnectionModel);
        onClose?.();
    }
    
    const getUtilityById = (id: string): Utility | null => {
        return utilities.find(x => x.Id.toString() == id.toString());
    }

    const getMappedUtilities = () => {
        return utilities.map(x => ({ value: x.Id, label: x.Name }));
    }

    const mapMeters = (meterList: Meter[]) => {
        return meterList.map(x => ({ value: x.Id, label: x.SerialNumber }));
    }
    
    const loadUtilities = () => {
        UtilityService.getAll()
            .then((res) => {
                setUtilities(res.data);
                getMappedUtilities();
                setSelectedUtilities(res.data[0])
            })
            .catch((err) => {
                setUtilities([]);
            })
    }

    const loadMeters = () => {
        MeterService.getAll()
            .then((res) => {
                setMeters(mapMeters(res.data))
            })
            .catch((err) => {
                setMeters([]);
            })
    }

    useEffect(() => {
        loadUtilities();
        loadMeters();
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
                            options={getMappedUtilities()}
                            onChange={(event) => setSelectedUtilities(getUtilityById(event.target.value))}
                        />

                        <Select
                            label="Status"
                            {...register("Status", { required: "This field is required", valueAsNumber: true })}
                            options={[
                                { value: ConnectionStatus.Active, label: 'Active' },
                                { value: ConnectionStatus.Inactive, label: 'Inactive' },
                            ]}
                        />

                        {
                            !!selectedUtility && (selectedUtility.BillingType === BillingType.Metered
                                ? <Select
                                    label="Meter"
                                    {...register("MeterId", {valueAsNumber: true})}
                                    options={meters}
                                />

                                : <Input
                                    type="number"
                                    label="Billing quantity"
                                    placeholder="Enter the Billing quantity"
                                    {...register("BillingQuantity", {
                                        required: "This field is required",
                                        valueAsNumber: true
                                    })}
                                />)
                        }
                        
                        <Input
                            label="Description"
                            placeholder="Enter the Description"
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
        </>
    )
}
