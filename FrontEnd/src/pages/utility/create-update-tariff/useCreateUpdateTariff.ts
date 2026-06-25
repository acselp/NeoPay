import { useState } from "react";
import { Tariff } from "../types";
import { TariffService } from "../../../services/tariff/tariff-service";
import { TariffRow } from "../../../features/tariffs";

export const useCreateUpdateTariff = (utilityId: number) => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [editModel, setEditModel] = useState<Tariff | null>(null);
    const [deleteModel, setDeleteModel] = useState<TariffRow | null>(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const refresh = () => setRefreshKey((prev) => prev + 1);

    const onAdd = () => {
        setEditModel(null);
        setIsCreateModalOpen(true);
    };

    const onEdit = (model: TariffRow) => {
        setEditModel(model);
        setIsCreateModalOpen(true);
    };

    const onModalClose = () => {
        setIsCreateModalOpen(false);
        setEditModel(null);
    };

    const onCreateSubmit = (model: Tariff) =>
        TariffService.create(model).then(() => refresh());

    const onEditSubmit = (model: Tariff) =>
        TariffService.update(model).then(() => refresh());

    const onSubmit = (data: Tariff) => {
        if (!!editModel)
            onEditSubmit(data);
        else
            onCreateSubmit(data);
    };

    const onDelete = (model: TariffRow) => setDeleteModel(model);

    const onDeleteCancel = () => setDeleteModel(null);

    const onDeleteConfirm = () => {
        if (!deleteModel?.Id) return;
        TariffService.delete(deleteModel.Id)
            .then(() => refresh())
            .finally(() => setDeleteModel(null));
    };

    return {
        utilityId,
        isCreateModalOpen,
        editModel,
        deleteModel,
        refreshKey,
        onAdd,
        onEdit,
        onModalClose,
        onSubmit,
        onDelete,
        onDeleteCancel,
        onDeleteConfirm,
    };
};
