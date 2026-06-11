import { Modal, Input, Button, Select } from '../../components/ui';
import { useState } from "react";
import type { ChangeEvent } from "react";
import type { Customer } from "./types";
import type { CreateUpdateProps } from "./types";

export const CreateUpdate = ({ active, onClose, onSubmit }: CreateUpdateProps) => {
    const [formData, setFormData] = useState<Partial<Customer>>({});
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = () => {
        onSubmit?.(formData as Customer);
        onClose();
    }

    return (
        <>
            <Modal isOpen={active} onClose={onClose} title="Create customer" size="md">
                {/* Form fields */}
                <div className="space-y-4">
                    <Input
                        value={formData.FirstName}
                        name="FirstName"
                        label="First Name"
                        placeholder="Enter customer first name"
                        onChange={handleChange}
                    />

                    <Input
                        value={formData.LastName}
                        name="LastName"
                        label="Last Name"
                        placeholder="Enter customer last name"
                        onChange={handleChange}
                    />

                    <Input
                        value={formData.Email ?? ''}
                        name="Email"
                        label="Email"
                        placeholder="Enter customer email"
                        onChange={handleChange}
                    />

                    <Input
                        value={formData.Phone ?? ''}
                        name="Phone"
                        label="Phone number"
                        placeholder="Enter customer phone number"
                        onChange={handleChange}
                    />

                    <Input
                        value={formData.AccountNr}
                        type="number"
                        name="AccountNr"
                        label="Account Number"
                        placeholder="Enter account number of the customer"
                        onChange={handleChange}
                    />

                    <Select
                        value={formData.Status}
                        name="Status"
                        label="Status"
                        placeholder="Select the customer status"
                        onChange={handleChange}
                        options={[
                        { value: 'inactive', label: 'Inactive' },
                        { value: 'active', label: 'Active' },
                    ]}
                    />

                    <Input
                        value={formData.Notes ?? ''}
                        name="Notes"
                        label="Notes"
                        placeholder="Enter some notes about the customer"
                        onChange={handleChange}
                    />
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
                    <Button variant="secondary" type="button" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        type="submit"
                    >
                        Save
                    </Button>
                </div>
            </Modal>
        </>
    )
}
