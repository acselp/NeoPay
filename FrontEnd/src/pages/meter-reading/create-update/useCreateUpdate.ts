import {useState} from "react";
import { MeterReadingCreateModel } from "../types";
import { MeterReadingService } from "../../../services/meter-reading/meter-service";

export const useCreateUpdate = (onChanged?: () => void) => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const onEdit = (model: MeterReadingCreateModel) => {
        setIsCreateModalOpen(true);
    }

    const onModalClose = () => {
        setIsCreateModalOpen(false)
    }

    const onCreateSubmit = (model: MeterReadingCreateModel) =>
        MeterReadingService.create(model).then(() => onChanged?.())


    return {
        onCreateSubmit,
        onEdit,
        setIsCreateModalOpen,
        onModalClose,
        isCreateModalOpen,
    }
}
