import { Plus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Button } from '../../../components/ui';
import { DataTable } from "../../../components/data-table/data-table";
import { GetSchema } from "./schema";
import { CreateUpdate } from "../create-update/CreateUpdate";
import { useCreateUpdate } from "../create-update/useCreateUpdate";

export default function ReadingList() {
    const [refreshKey, setRefreshKey] = useState(0);
    const refresh = () => setRefreshKey((prev) => prev + 1);

    const {
        onModalClose,
        setIsCreateModalOpen,
        isCreateModalOpen,
        onCreateSubmit
    } = useCreateUpdate(refresh);

    const tableSchema = useMemo(() => GetSchema(), []);

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Meter reading</h1>
                    <p className="text-gray-500 mt-1">
                        Manage meter readings
                    </p>
                </div>
                <Button onClick={() => setIsCreateModalOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Reading
                </Button>
            </div>

            <DataTable key={refreshKey} {...tableSchema} />

            <CreateUpdate
                active={isCreateModalOpen}
                onClose={() => onModalClose()}
                onSubmit={onCreateSubmit}
            />
        </div>
    );
}
