import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Plus,
  Cable,
  Gauge,
  AlertTriangle,
  Calendar,
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
import { CustomerService } from "../../../services/customer/customer-service";
import { mapStatusToVariantBadge } from "../helpers";
import { GetTabs } from "./tabs";

export default function Detail() {
  const { customerId } = useParams();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const navigate = useNavigate()
  const tabs = useMemo(() => GetTabs({ customer }), [])

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
          { label: 'Customers', href: '/customers' },
          { label: customer.FullName },
        ]}
      />

      {/* Header */}
      <div className="flex items-start justify-between mt-4 mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">{customer.FullName}</h1>
            <Badge variant={mapStatusToVariantBadge(customer.Status)}>{CustomerStatus[customer.Status]}</Badge>
          </div>
          <div className="text-gray-500 mt-1">
            {customer.Email} &middot; {customer.Phone}
          </div>
        </div>
        <Button onClick={() => navigate(`/customers/${customerId}/connections/new`)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Connection
        </Button>
      </div>

      {/*/!* KPI Cards *!/*/}
      {/*<div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">*/}
      {/*  <KPICard*/}
      {/*    title="Active Connections"*/}
      {/*    value={activeConnections.length}*/}
      {/*    subtitle={`of ${connections.length} total`}*/}
      {/*    icon={Cable}*/}
      {/*  />*/}
      {/*  <KPICard*/}
      {/*    title="Total Meters"*/}
      {/*    value={totalMeters}*/}
      {/*    icon={Gauge}*/}
      {/*  />*/}
      {/*  <KPICard*/}
      {/*    title="Last Reading"*/}
      {/*    value={latestReadingDate ? (latestReadingDate as Date).toLocaleDateString() : 'Never'}*/}
      {/*    icon={Calendar}*/}
      {/*  />*/}
      {/*  <KPICard*/}
      {/*    title="Alerts"*/}
      {/*    value={alertCount}*/}
      {/*    subtitle={alertCount > 0 ? 'Missing readings' : 'All good'}*/}
      {/*    icon={AlertTriangle}*/}
      {/*  />*/}
      {/*</div>*/}

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <Tabs tabs={tabs} defaultTab="notes" />
      </div>
    </div>
  );
}
