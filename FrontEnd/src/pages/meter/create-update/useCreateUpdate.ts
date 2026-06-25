import {useState} from "react";
import {Meter} from "../types";
import {MeterService} from "../../../services/meter/meter-service";

export const useCreateUpdate = (onChanged?: () => void) => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editModel, setEditModel] = useState<Meter | null>(null);
    const [deleteModel, setDeleteModel] = useState<Meter | null>(null);

    const onEdit = (model: Meter) => {
        setEditModel(model);
        setIsCreateModalOpen(true);
    }

    const onModalClose = () => {
        setIsCreateModalOpen(false)
        setEditModel(null);
    }

    const onCreateSubmit = (model: Meter) =>
        MeterService.create(model).then(() => onChanged?.())

    const onEditSubmit = (model: Meter) =>
        MeterService.update(model).then(() => onChanged?.())

    const onSubmit = (data: Meter) => {
        if (!!editModel)
            onEditSubmit(data)
        else
            onCreateSubmit(data)
    }

    const onDelete = (model: Meter) => setDeleteModel(model);

    const onDeleteCancel = () => setDeleteModel(null);

    const onDeleteConfirm = () => {
        if (!deleteModel) return;
        MeterService.delete(deleteModel.Id)
            .then(() => onChanged?.())
            .finally(() => setDeleteModel(null));
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
        onDeleteConfirm,
    }
}
