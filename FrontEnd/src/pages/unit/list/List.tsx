import { Plus } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Button, ConfirmDialog } from '../../../components/ui';
import { CreateUpdate } from "../create-update/CreateUpdate";
import { DataTable } from "../../../components/data-table/data-table";
import { GetSchema } from "./schema";
import { useCreateUpdate } from "../create-update/useCreateUpdate";

export default function List() {
    const [refreshKey, setRefreshKey] = useState(0);
    const refresh = () => setRefreshKey((prev) => prev + 1);

    const {
        onEdit,
        editModel,
        onModalClose,
        setIsCreateModalOpen,
        isCreateModalOpen,
        onSubmit,
        deleteModel,
        onDelete,
        onDeleteCancel,
        onDeleteConfirm,
    } = useCreateUpdate(refresh);

    const tableSchema = useMemo(() => GetSchema({ onEdit, onDelete }), []);

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Units</h1>
                    <p className="text-gray-500 mt-1">
                        Manage measurement units used by utilities
                    </p>
                </div>
                <Button onClick={() => setIsCreateModalOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Unit
                </Button>
            </div>

            <DataTable key={refreshKey} {...tableSchema} />

            <CreateUpdate
                active={isCreateModalOpen}
                model={editModel}
                onClose={() => onModalClose()}
                onSubmit={onSubmit}
            />

            <ConfirmDialog
                isOpen={!!deleteModel}
                title="Delete unit"
                message={
                    <>
                        Are you sure you want to delete{' '}
                        <span className="font-medium text-gray-900">{deleteModel?.LongName}</span>?
                        This action cannot be undone.
                    </>
                }
                confirmLabel="Delete"
                onConfirm={onDeleteConfirm}
                onCancel={onDeleteCancel}
            />
        </div>
    );
}
