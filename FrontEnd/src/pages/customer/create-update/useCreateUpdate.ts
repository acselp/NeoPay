import {useState} from "react";
import {Customer} from "../types";
import {CustomerService} from "../../../services/customer/customer-service";

export const useCreateUpdate = ({ onChange }: { onChange?: Function }) => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editModel, setEditModel] = useState<Customer | null>(null);
    const [deleteModel, setDeleteModel] = useState<Customer | null>(null);

    const onEdit = (model: Customer) => {
        setEditModel(model);
        setIsCreateModalOpen(true);
    }

    const onModalClose = () => {
        setIsCreateModalOpen(false)
        setEditModel(null);
    }

    const onDelete = (model: Customer) => setDeleteModel(model);

    const onDeleteCancel = () => setDeleteModel(null);

    const onDeleteConfirm = () => {
        if (!deleteModel) return;
        CustomerService.delete(deleteModel.Id)
            .finally(() => {
                setDeleteModel(null);
                onChange?.();
            })
    }

    const onCreateSubmit = (model: Customer) => {
        CustomerService.create(model)
            .finally(() => {
                onChange?.();
            })
    }

    const onEditSubmit = (model: Customer) => {
        CustomerService.update(model)
            .finally(() => {
                onChange?.();
            })
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
        isCreateModalOpen,
        deleteModel,
        onDelete,
        onDeleteCancel,
        onDeleteConfirm
    }
}