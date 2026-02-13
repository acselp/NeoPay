import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Eye, Cable, MoreHorizontal } from 'lucide-react';
import {
  Button,
  Badge,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  SearchInput,
  Select,
  EmptyState,
} from '../components/ui';
import {
  customers,
  getCustomerConnections,
  getConnectionMeter,
  getLatestReading,
} from '../data/mockData';

export default function CustomersList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [connectionFilter, setConnectionFilter] = useState('');

  const customersWithStats = useMemo(() => {
    return customers.map(customer => {
      const connections = getCustomerConnections(customer.id);
      const activeConnections = connections.filter(c => c.status === 'active');

      // Find latest reading date across all connections
      let latestReadingDate = null;
      connections.forEach(conn => {
        const meter = getConnectionMeter(conn.id);
        if (meter) {
          const reading = getLatestReading(meter.id);
          if (reading) {
            const readingDate = new Date(reading.readingDate);
            if (!latestReadingDate || readingDate > latestReadingDate) {
              latestReadingDate = readingDate;
            }
          }
        }
      });

      // Check if missing recent readings (30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const missingReadings = activeConnections.length > 0 &&
        (!latestReadingDate || latestReadingDate < thirtyDaysAgo);

      return {
        ...customer,
        connectionCount: connections.length,
        activeConnectionCount: activeConnections.length,
        latestReadingDate,
        missingReadings,
      };
    });
  }, []);

  const filteredCustomers = useMemo(() => {
    return customersWithStats.filter(customer => {
      // Search filter
      if (search) {
        const searchLower = search.toLowerCase();
        if (
          !customer.name.toLowerCase().includes(searchLower) &&
          !customer.email.toLowerCase().includes(searchLower) &&
          !customer.phone.includes(search)
        ) {
          return false;
        }
      }

      // Status filter
      if (statusFilter && customer.status !== statusFilter) {
        return false;
      }

      // Connection filter
      if (connectionFilter === 'active' && customer.activeConnectionCount === 0) {
        return false;
      }
      if (connectionFilter === 'no-connections' && customer.connectionCount > 0) {
        return false;
      }
      if (connectionFilter === 'missing-readings' && !customer.missingReadings) {
        return false;
      }

      return true;
    });
  }, [customersWithStats, search, statusFilter, connectionFilter]);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-500 mt-1">
            Manage customer accounts and their utility connections
          </p>
        </div>
        <Button onClick={() => navigate('/customers/new')}>
          <Plus className="h-4 w-4 mr-2" />
          Add Customer
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search by name, email, or phone..."
            />
          </div>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            placeholder="All statuses"
            options={[
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
              { value: 'pending', label: 'Pending' },
            ]}
            className="w-40"
          />
          <Select
            value={connectionFilter}
            onChange={(e) => setConnectionFilter(e.target.value)}
            placeholder="All connections"
            options={[
              { value: 'active', label: 'Has active connections' },
              { value: 'no-connections', label: 'No connections' },
              { value: 'missing-readings', label: 'Missing readings' },
            ]}
            className="w-48"
          />
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-500 mb-4">
        Showing {filteredCustomers.length} of {customers.length} customers
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {filteredCustomers.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Connections</TableHead>
                <TableHead>Last Reading</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow
                  key={customer.id}
                  onClick={() => navigate(`/customers/${customer.id}`)}
                  className="cursor-pointer"
                >
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900">
                        {customer.name}
                      </div>
                      <div className="text-gray-500 text-xs">
                        Since {new Date(customer.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-gray-900">{customer.email}</div>
                    <div className="text-gray-500 text-xs">{customer.phone}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={customer.status}>{customer.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{customer.activeConnectionCount}</span>
                      <span className="text-gray-500">/ {customer.connectionCount}</span>
                      {customer.missingReadings && (
                        <span className="w-2 h-2 bg-orange-500 rounded-full" title="Missing recent readings" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {customer.latestReadingDate
                      ? customer.latestReadingDate.toLocaleDateString()
                      : 'No readings'}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                      <Link
                        to={`/customers/${customer.id}`}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                        title="View customer"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <Link
                        to={`/customers/${customer.id}/connections/new`}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                        title="Add connection"
                      >
                        <Cable className="h-4 w-4" />
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <EmptyState
            title="No customers found"
            description="Try adjusting your search or filter criteria"
          />
        )}
      </div>
    </div>
  );
}
