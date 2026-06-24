import {useState} from "react";
import {CreateConnectionModel} from "../types";
import {ConnectionService} from "../../../services/connection/connection-service";

export const useCreateConnection = () => {
    const [isCreateConnectionModalOpen, setIsModalOpen] = useState(false);
    
    const onCloseCreateConnection = () => {
        setIsModalOpen(false);
    }
    
    const onSubmitCreateConnection = (model: CreateConnectionModel) => {
        ConnectionService.create(model)
            .then(() => {
                setIsModalOpen(false);
            })
    }
    
    const openCreateConnectionModal = () => {
        setIsModalOpen(true);
    }
    
    return {
        isCreateConnectionModalOpen,
        openCreateConnectionModal,
        onCloseCreateConnection,
        onSubmitCreateConnection
    }
}