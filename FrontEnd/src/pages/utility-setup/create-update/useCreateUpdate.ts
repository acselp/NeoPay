import { useState } from "react"
import { UtilityModel } from "../types"
import { UtilityService } from "../../../services/utility/utility-service"

export const useCreateUpdate = (onChanged?: () => void) => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [editModel, setEditModel] = useState<UtilityModel | null>(null)
    const [deleteModel, setDeleteModel] = useState<UtilityModel | null>(null)

    const onEdit = (model: UtilityModel) => {
        setEditModel(model)
        setIsCreateModalOpen(true)
    }

    const onModalClose = () => {
        setIsCreateModalOpen(false)
        setEditModel(null)
    }

    const onCreateSubmit = (model: UtilityModel) =>
        UtilityService.create(model).then(() => onChanged?.())

    const onEditSubmit = (model: UtilityModel) =>
        UtilityService.update(model).then(() => onChanged?.())

    const onSubmit = (data: UtilityModel) => {
        if (!!editModel)
            onEditSubmit(data)
        else
            onCreateSubmit(data)
    }

    const onDelete = (model: UtilityModel) => setDeleteModel(model)

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
