import { Plus } from 'lucide-react';
import { useMemo, useState } from 'react';
import {
    Button,
} from '../../../components/ui';
import { Customer } from "../types";
import { CustomerService } from "../../../services/customer/customer-service";
import { CreateUpdate } from "../create-update/CreateUpdate";
import { DataTable } from "../../../components/data-table/data-table";
import { GetSchema } from "./schema";
import { useNavigate } from "react-router-dom";

export default function List() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const navigate = useNavigate()
    const tableSchema = useMemo(() => GetSchema({ navigate }), []);
    const onCreateSubmit = (model: Customer) => {
        CustomerService.create(model)
    }

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
                onClose={ () => setIsCreateModalOpen(false) }
                onSubmit={ onCreateSubmit }
            />
        </div>
    );
}
