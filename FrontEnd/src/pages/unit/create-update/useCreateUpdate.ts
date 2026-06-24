import {useState} from "react";
import {Unit} from "../types";
import {UnitService} from "../../../services/unit/unit-service";

export const useCreateUpdate = (onChanged?: () => void) => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editModel, setEditModel] = useState<Unit | null>(null);
    const [deleteModel, setDeleteModel] = useState<Unit | null>(null);

    const onEdit = (model: Unit) => {
        setEditModel(model);
        setIsCreateModalOpen(true);
    }

    const onModalClose = () => {
        setIsCreateModalOpen(false)
        setEditModel(null);
    }

    const onCreateSubmit = (model: Unit) =>
        UnitService.create(model).then(() => onChanged?.())

    const onEditSubmit = (model: Unit) =>
        UnitService.update(model).then(() => onChanged?.())

    const onSubmit = (data: Unit) => {
        if (!!editModel)
            onEditSubmit(data)
        else
            onCreateSubmit(data)
    }

    const onDelete = (model: Unit) => setDeleteModel(model);

    const onDeleteCancel = () => setDeleteModel(null);

    const onDeleteConfirm = () => {
        if (!deleteModel) return;
        UnitService.delete(deleteModel.Id)
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
