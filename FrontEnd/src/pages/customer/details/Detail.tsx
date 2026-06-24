import {useEffect, useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {
    Plus,
    HashIcon, CalendarPlus, CalendarClock, Pencil
} from 'lucide-react';
import {
    Button,
    Badge,
    KPICard,
    Tabs,
    Breadcrumbs,
    EmptyState,
} from '../../../components/ui';
import {
    Customer, CustomerStatus,
} from '../types';
import {CustomerService} from "../../../services/customer/customer-service";
import {mapStatusToVariantBadge} from "../helpers";
import {GetTabs} from "./tabs";
import {CreateUpdate} from "../create-update/CreateUpdate";
import {useCreateUpdate} from "../create-update/useCreateUpdate";
import {CreateConnection} from "../create-connection/CreateConnection";
import {useCreateConnection} from "../create-connection/useCreateConnection";

export default function Detail() {
    const {customerId} = useParams();
    const [customer, setCustomer] = useState<Customer | null>(null);
    const navigate = useNavigate()
    const tabs = GetTabs({customer});
    const { onEdit, editModel, onModalClose, isCreateModalOpen, onSubmit } = useCreateUpdate({});
    const { isCreateConnectionModalOpen, onSubmitCreateConnection, onCloseCreateConnection, openCreateConnectionModal } = useCreateConnection();

    useEffect(() => {
        CustomerService.getById(customerId)
            .then((res) => {
                setCustomer(res.data);
            })
    }, [])

    if (!customer) {
        return (
            <div className="p-8">
                <EmptyState
                    title="Customer not found"
                    description="The customer you're looking for doesn't exist or has been removed."
                    action={() => navigate('/customers')}
                    actionLabel="Back to Customers"
                />
            </div>
        );
    }

    return (
        <div className="p-8">
            {/* Breadcrumbs */}
            <Breadcrumbs
                items={[
                    {label: 'Customers', href: '/customers'},
                    {label: `${customer.FirstName} ${customer.LastName}`},
                ]}
            />

            {/* Header */}
            <div className="flex items-start justify-between mt-4 mb-6">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-gray-900">{customer.FirstName} {customer.LastName}</h1>
                        <Badge
                            variant={mapStatusToVariantBadge(customer.Status)}>{CustomerStatus[customer.Status]}</Badge>
                    </div>
                    <div className="text-gray-500 mt-1">
                        {customer.Email} &middot; {customer.Phone}
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button onClick={() => openCreateConnectionModal()}>
                        <Plus className="h-4 w-4 mr-2"/>
                        Add Connection
                    </Button>
                    <Button onClick={() => onEdit(customer)}>
                        <Pencil className="h-4 w-4 mr-2"/>
                        Edit
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <KPICard
                    title="Account Number"
                    value={customer.AccountNr}
                    icon={HashIcon}
                />
                <KPICard
                    title="Last updated"
                    value={new Date(customer?.UpdatedOn ?? new Date()).toLocaleDateString()}
                    icon={CalendarClock}
                />
                <KPICard
                  title="Created on"
                  value={new Date(customer?.CreatedOn ?? new Date()).toLocaleDateString()}
                  icon={CalendarPlus}

                />
                {/*<KPICard*/}
                {/*  title="Alerts"*/}
                {/*  value={alertCount}*/}
                {/*  subtitle={alertCount > 0 ? 'Missing readings' : 'All good'}*/}
                {/*  icon={AlertTriangle}*/}
                {/*/>*/}
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <Tabs tabs={tabs} defaultTab="notes"/>
            </div>

            <CreateUpdate
                active={ isCreateModalOpen }
                model={editModel}
                onClose={ () => onModalClose() }
                onSubmit={ onSubmit }
            />
            
            <CreateConnection 
                active={isCreateConnectionModalOpen} 
                onClose={onCloseCreateConnection} 
                onSubmit={ onSubmitCreateConnection }
                customerId={Number(customerId)} 
            />
        </div>
    );
}
