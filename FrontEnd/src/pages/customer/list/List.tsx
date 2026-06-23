import { Plus } from 'lucide-react';
import { useMemo } from 'react';
import {
    Button,
} from '../../../components/ui';
import { CreateUpdate } from "../create-update/CreateUpdate";
import { DataTable } from "../../../components/data-table/data-table";
import { GetSchema } from "./schema";
import { useNavigate } from "react-router-dom";
import {useCreateUpdate} from "../create-update/useCreateUpdate";

export default function List() {
    const navigate = useNavigate()
    const { onEdit, editModel, onModalClose, setIsCreateModalOpen, isCreateModalOpen, onSubmit } = useCreateUpdate();
    
    const tableSchema = useMemo(() => GetSchema({ navigate, onEdit }), []);

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
                    <p className="text-gray-500 mt-1">
                        Manage customer accounts and their utility connections
                    </p>
                </div>
                <Button onClick={ () => setIsCreateModalOpen(true) }>
                    <Plus className="h-4 w-4 mr-2"/>
                    Add Customer
                </Button>
            </div>


            <DataTable { ...tableSchema }/>

            <CreateUpdate
                active={ isCreateModalOpen }
                model={editModel}
                onClose={ () => onModalClose() }
                onSubmit={ onSubmit }
            />
        </div>
    );
}
