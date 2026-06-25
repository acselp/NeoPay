import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Plus, Ruler, Receipt } from 'lucide-react';
import {
    Button,
    Badge,
    KPICard,
    Tabs,
    Breadcrumbs,
    EmptyState,
    ConfirmDialog,
} from '../../../components/ui';
import { Utility } from '../../utility-setup/types';
import { BillingType } from '../../utility-setup/create-update/types';
import { UtilityService } from '../../../services/utility/utility-service';
import { GetTabs } from './tabs';
import { CreateUpdateTariff } from '../create-update-tariff/CreateUpdateTariff';
import { useCreateUpdateTariff } from '../create-update-tariff/useCreateUpdateTariff';

export default function Detail() {
    const { utilityId } = useParams();
    const id = Number(utilityId);
    const [utility, setUtility] = useState<Utility | null>(null);
    const navigate = useNavigate();

    const {
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
    } = useCreateUpdateTariff(id);

    useEffect(() => {
        UtilityService.getById(id)
            .then((res) => setUtility(res.data))
            .catch(() => setUtility(null));
    }, [id]);

    if (!utility) {
        return (
            <div className="p-8">
                <EmptyState
                    title="Utility not found"
                    description="The utility you're looking for doesn't exist or has been removed."
                    action={() => navigate('/utilities')}
                    actionLabel="Back to Utilities"
                />
            </div>
        );
    }

    const tabs = GetTabs({ utilityId: id, onEdit, onDelete, refreshKey });

    return (
        <div className="p-8">
            {/* Breadcrumbs */}
            <Breadcrumbs
                items={[
                    { label: 'Utilities', href: '/utilities' },
                    { label: utility.Name },
                ]}
            />

            {/* Header */}
            <div className="flex items-start justify-between mt-4 mb-6">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-gray-900">{utility.Name}</h1>
                        <Badge variant="default">{BillingType[utility.BillingType]}</Badge>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button onClick={onAdd}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Tariff
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <KPICard
                    title="Billing type"
                    value={BillingType[utility.BillingType]}
                    icon={Receipt}
                />
                <KPICard
                    title="Unit"
                    value={utility.Unit ? `${utility.Unit.LongName} (${utility.Unit.Symbol})` : '—'}
                    icon={Ruler}
                />
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <Tabs tabs={tabs} defaultTab="tariffs" />
            </div>

            <CreateUpdateTariff
                active={isCreateModalOpen}
                model={editModel}
                utilityId={id}
                onClose={onModalClose}
                onSubmit={onSubmit}
            />

            <ConfirmDialog
                isOpen={!!deleteModel}
                title="Delete tariff"
                message={
                    <>
                        Are you sure you want to delete{' '}
                        <span className="font-medium text-gray-900">{deleteModel?.Title}</span>?
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
