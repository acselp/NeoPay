import { useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Plus,
  Cable,
  Gauge,
  AlertTriangle,
  Calendar,
  Eye,
  Power,
  RefreshCw,
  MapPin,
} from 'lucide-react';
import {
  Button,
  Badge,
  KPICard,
  Tabs,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Breadcrumbs,
  EmptyState,
  Card,
  CardTitle,
} from '../components/ui';
import {
  getCustomer,
  getCustomerConnections,
  getCustomerLocations,
  getConnectionMeter,
  getLatestReading,
  getUtility,
  getLocation,
  readings,
  meters,
} from '../data/mockData';

export default function CustomerDetail() {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const customer = getCustomer(customerId);

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

  const connections = getCustomerConnections(customerId);
  const locations = getCustomerLocations(customerId);

  // Calculate stats
  const activeConnections = connections.filter(c => c.status === 'active');
  const totalMeters = connections.reduce((count, conn) => {
    return count + (getConnectionMeter(conn.id) ? 1 : 0);
  }, 0);

  // Find latest reading date and check for alerts
  let latestReadingDate = null;
  let alertCount = 0;
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  activeConnections.forEach(conn => {
    const meter = getConnectionMeter(conn.id);
    if (meter) {
      const reading = getLatestReading(meter.id);
      if (reading) {
        const readingDate = new Date(reading.readingDate);
        if (!latestReadingDate || readingDate > latestReadingDate) {
          latestReadingDate = readingDate;
        }
        if (readingDate < thirtyDaysAgo) {
          alertCount++;
        }
      } else {
        alertCount++;
      }
    }
  });

  // Get all readings for this customer
  const customerReadings = useMemo(() => {
    const meterIds = connections
      .map(conn => getConnectionMeter(conn.id))
      .filter(Boolean)
      .map(m => m.id);

    return readings
      .filter(r => meterIds.includes(r.meterId))
      .sort((a, b) => new Date(b.readingDate) - new Date(a.readingDate))
      .slice(0, 10)
      .map(reading => {
        const meter = meters.find(m => m.id === reading.meterId);
        const conn = connections.find(c => c.id === meter?.connectionId);
        const utility = conn ? getUtility(conn.utilityId) : null;
        const location = conn ? getLocation(conn.locationId) : null;
        return { reading, meter, conn, utility, location };
      });
  }, [connections]);

  const tabs = [
    {
      id: 'connections',
      label: 'Connections',
      count: connections.length,
      content: (
        <ConnectionsTab
          connections={connections}
          customerId={customerId}
          navigate={navigate}
        />
      ),
    },
    {
      id: 'readings',
      label: 'Readings',
      count: customerReadings.length,
      content: <ReadingsTab readings={customerReadings} />,
    },
    {
      id: 'notes',
      label: 'Notes',
      content: <NotesTab customer={customer} />,
    },
  ];

  return (
    <div className="p-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Customers', href: '/customers' },
          { label: customer.name },
        ]}
      />

      {/* Header */}
      <div className="flex items-start justify-between mt-4 mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">{customer.name}</h1>
            <Badge variant={customer.status}>{customer.status}</Badge>
          </div>
          <div className="text-gray-500 mt-1">
            {customer.email} &middot; {customer.phone}
          </div>
        </div>
        <Button onClick={() => navigate(`/customers/${customerId}/connections/new`)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Connection
        </Button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <KPICard
          title="Active Connections"
          value={activeConnections.length}
          subtitle={`of ${connections.length} total`}
          icon={Cable}
        />
        <KPICard
          title="Total Meters"
          value={totalMeters}
          icon={Gauge}
        />
        <KPICard
          title="Last Reading"
          value={latestReadingDate ? latestReadingDate.toLocaleDateString() : 'Never'}
          icon={Calendar}
        />
        <KPICard
          title="Alerts"
          value={alertCount}
          subtitle={alertCount > 0 ? 'Missing readings' : 'All good'}
          icon={AlertTriangle}
        />
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <Tabs tabs={tabs} defaultTab="connections" />
      </div>
    </div>
  );
}

function ConnectionsTab({ connections, customerId, navigate }) {
  if (connections.length === 0) {
    return (
      <EmptyState
        icon={Cable}
        title="No connections yet"
        description="Add a connection to start tracking utility usage for this customer."
        action={() => navigate(`/customers/${customerId}/connections/new`)}
        actionLabel="Add Connection"
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Utility</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Meter</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Reading</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {connections.map((conn) => {
          const utility = getUtility(conn.utilityId);
          const location = getLocation(conn.locationId);
          const meter = getConnectionMeter(conn.id);
          const latestReading = meter ? getLatestReading(meter.id) : null;

          return (
            <TableRow key={conn.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      utility?.name === 'Electricity'
                        ? 'bg-yellow-400'
                        : utility?.name === 'Water'
                        ? 'bg-blue-400'
                        : 'bg-orange-400'
                    }`}
                  />
                  <span className="font-medium text-gray-900">{utility?.name}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-gray-400" />
                  <span>{location?.label}</span>
                </div>
                <div className="text-xs text-gray-500">{location?.address}</div>
              </TableCell>
              <TableCell>
                {meter ? (
                  <div>
                    <div className="font-mono text-sm">{meter.serialNumber}</div>
                    <div className="text-xs text-gray-500">
                      {meter.digits} digits &middot; ×{meter.multiplier}
                    </div>
                  </div>
                ) : (
                  <span className="text-gray-400 text-sm">No meter</span>
                )}
              </TableCell>
              <TableCell>
                <Badge variant={conn.status}>{conn.status}</Badge>
              </TableCell>
              <TableCell>
                {latestReading ? (
                  <div>
                    <div className="font-medium">
                      {latestReading.value.toLocaleString()} {utility?.unit}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(latestReading.readingDate).toLocaleDateString()}
                    </div>
                  </div>
                ) : (
                  <span className="text-gray-400 text-sm">No readings</span>
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <Link
                    to={`/connections/${conn.id}/readings/new`}
                    className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg"
                    title="Add reading"
                  >
                    <Gauge className="h-4 w-4" />
                  </Link>
                  <Link
                    to={`/connections/${conn.id}`}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                    title="View connection"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                  {conn.status === 'active' && (
                    <button
                      className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg"
                      title="Replace meter"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    className={`p-2 rounded-lg ${
                      conn.status === 'active'
                        ? 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                        : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                    }`}
                    title={conn.status === 'active' ? 'Disconnect' : 'Reactivate'}
                  >
                    <Power className="h-4 w-4" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

function ReadingsTab({ readings }) {
  if (readings.length === 0) {
    return (
      <EmptyState
        icon={Gauge}
        title="No readings yet"
        description="Readings will appear here once they are recorded for this customer's connections."
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Utility</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Meter</TableHead>
          <TableHead>Value</TableHead>
          <TableHead>Source</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {readings.map(({ reading, utility, location, meter }) => (
          <TableRow key={reading.id}>
            <TableCell className="text-gray-900">
              {new Date(reading.readingDate).toLocaleDateString()}
            </TableCell>
            <TableCell>{utility?.name}</TableCell>
            <TableCell>{location?.label}</TableCell>
            <TableCell className="font-mono text-sm">
              {meter?.serialNumber}
            </TableCell>
            <TableCell className="font-medium">
              {reading.value.toLocaleString()} {utility?.unit}
            </TableCell>
            <TableCell>
              <Badge variant={reading.source === 'smart-meter' ? 'active' : 'default'}>
                {reading.source}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function NotesTab({ customer }) {
  return (
    <Card>
      <CardTitle className="mb-4">Customer Notes</CardTitle>
      {customer.notes ? (
        <p className="text-gray-700">{customer.notes}</p>
      ) : (
        <p className="text-gray-500 italic">No notes added for this customer.</p>
      )}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          Customer since: {new Date(customer.createdAt).toLocaleDateString()}
        </p>
      </div>
    </Card>
  );
}
