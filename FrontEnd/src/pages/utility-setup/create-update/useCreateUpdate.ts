import { useState } from "react"
import { Utility } from "../types"
import { UtilityService } from "../../../services/utility/utility-service"

export const useCreateUpdate = (onChanged?: () => void) => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [editModel, setEditModel] = useState<Utility | null>(null)
    const [deleteModel, setDeleteModel] = useState<Utility | null>(null)

    const onEdit = (model: Utility) => {
        setEditModel(model)
        setIsCreateModalOpen(true)
    }

    const onModalClose = () => {
        setIsCreateModalOpen(false)
        setEditModel(null)
    }

    const onCreateSubmit = (model: Utility) =>
        UtilityService.create(model).then(() => onChanged?.())

    const onEditSubmit = (model: Utility) =>
        UtilityService.update(model).then(() => onChanged?.())

    const onSubmit = (data: Utility) => {
        if (!!editModel)
            onEditSubmit(data)
        else
            onCreateSubmit(data)
    }

    const onDelete = (model: Utility) => setDeleteModel(model)

    const onDeleteCancel = () => setDeleteModel(null)

    const onDeleteConfirm = () => {
        if (!deleteModel?.Id) return
        UtilityService.delete(deleteModel.Id)
            .then(() => onChanged?.())
            .finally(() => setDeleteModel(null))
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
