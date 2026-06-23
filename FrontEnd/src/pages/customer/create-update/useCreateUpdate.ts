import {useState} from "react";
import {Customer} from "../types";
import {CustomerService} from "../../../services/customer/customer-service";

export const useCreateUpdate = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editModel, setEditModel] = useState<Customer | null>(null);

    const onEdit = (model: Customer) => {
        setEditModel(model);
        setIsCreateModalOpen(true);
    }

    const onModalClose = () => {
        setIsCreateModalOpen(false)
        setEditModel(null);
    }

    const onCreateSubmit = (model: Customer) => {
        CustomerService.create(model)
    }

    const onEditSubmit = (model: Customer) => {
        CustomerService.update(model)
    }

    const onSubmit = (data: Customer) => {
        if (!!editModel)
            onEditSubmit(data)
        else
            onCreateSubmit(data)
    }
    
    return {
        onSubmit,
        onEdit,
        setIsCreateModalOpen,
        onModalClose,
        editModel,
        isCreateModalOpen
    }
}