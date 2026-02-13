import { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, Gauge, MapPin } from 'lucide-react';
import {
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
  connections,
  utilities,
  getCustomer,
  getLocation,
  getUtility,
  getConnectionMeter,
  getLatestReading,
} from '../data/mockData';

export default function ConnectionsList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [utilityFilter, setUtilityFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const enrichedConnections = useMemo(() => {
    return connections.map((conn) => {
      const customer = getCustomer(conn.customerId);
      const location = getLocation(conn.locationId);
      const utility = getUtility(conn.utilityId);
      const meter = getConnectionMeter(conn.id);
      const latestReading = meter ? getLatestReading(meter.id) : null;

      return {
        ...conn,
        customer,
        location,
        utility,
        meter,
        latestReading,
      };
    });
  }, []);

  const filteredConnections = useMemo(() => {
    return enrichedConnections.filter((conn) => {
      // Search filter
      if (search) {
        const searchLower = search.toLowerCase();
        if (
          !conn.customer?.name.toLowerCase().includes(searchLower) &&
          !conn.location?.address.toLowerCase().includes(searchLower) &&
          !conn.meter?.serialNumber.toLowerCase().includes(searchLower) &&
          !conn.accountNumber.toLowerCase().includes(searchLower)
        ) {
          return false;
        }
      }

      // Utility filter
      if (utilityFilter && conn.utilityId !== utilityFilter) {
        return false;
      }

      // Status filter
      if (statusFilter && conn.status !== statusFilter) {
        return false;
      }

      return true;
    });
  }, [enrichedConnections, search, utilityFilter, statusFilter]);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Connections</h1>
          <p className="text-gray-500 mt-1">
            Manage all utility connections across customers
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search by customer, address, meter, or account..."
            />
          </div>
          <Select
            value={utilityFilter}
            onChange={(e) => setUtilityFilter(e.target.value)}
            placeholder="All utilities"
            options={utilities.map((u) => ({
              value: u.id,
              label: u.name,
            }))}
            className="w-40"
          />
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            placeholder="All statuses"
            options={[
              { value: 'active', label: 'Active' },
              { value: 'pending', label: 'Pending' },
              { value: 'disconnected', label: 'Disconnected' },
            ]}
            className="w-40"
          />
        </div>
      </div>

      {/* Summary stats */}
      <div className="flex gap-4 mb-4">
        <div className="text-sm">
          <span className="text-gray-500">Total:</span>{' '}
          <span className="font-medium">{connections.length}</span>
        </div>
        <div className="text-sm">
          <span className="text-gray-500">Active:</span>{' '}
          <span className="font-medium text-green-600">
            {connections.filter((c) => c.status === 'active').length}
          </span>
        </div>
        <div className="text-sm">
          <span className="text-gray-500">Pending:</span>{' '}
          <span className="font-medium text-yellow-600">
            {connections.filter((c) => c.status === 'pending').length}
          </span>
        </div>
        <div className="text-sm">
          <span className="text-gray-500">Disconnected:</span>{' '}
          <span className="font-medium text-red-600">
            {connections.filter((c) => c.status === 'disconnected').length}
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {filteredConnections.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Utility</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Meter</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Reading</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredConnections.map((conn) => (
                <TableRow
                  key={conn.id}
                  onClick={() => navigate(`/connections/${conn.id}`)}
                  className="cursor-pointer"
                >
                  <TableCell>
                    <Link
                      to={`/customers/${conn.customer?.id}`}
                      onClick={(e) => e.stopPropagation()}
                      className="font-medium text-blue-600 hover:text-blue-700"
                    >
                      {conn.customer?.name}
                    </Link>
                    <div className="text-xs text-gray-500">
                      {conn.accountNumber}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          conn.utility?.name === 'Electricity'
                            ? 'bg-yellow-400'
                            : conn.utility?.name === 'Water'
                            ? 'bg-blue-400'
                            : 'bg-orange-400'
                        }`}
                      />
                      {conn.utility?.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      <span>{conn.location?.label}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      {conn.location?.address}, {conn.location?.city}
                    </div>
                  </TableCell>
                  <TableCell>
                    {conn.meter ? (
                      <div>
                        <div className="font-mono text-sm">
                          {conn.meter.serialNumber}
                        </div>
                        <div className="text-xs text-gray-500">
                          {conn.meter.manufacturer}
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
                    {conn.latestReading ? (
                      <div>
                        <div className="font-medium">
                          {conn.latestReading.value.toLocaleString()}{' '}
                          {conn.utility?.unit}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(
                            conn.latestReading.readingDate
                          ).toLocaleDateString()}
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm">No readings</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div
                      className="flex items-center justify-end gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {conn.status === 'active' && conn.meter && (
                        <Link
                          to={`/connections/${conn.id}/readings/new`}
                          className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg"
                          title="Add reading"
                        >
                          <Gauge className="h-4 w-4" />
                        </Link>
                      )}
                      <Link
                        to={`/connections/${conn.id}`}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                        title="View connection"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <EmptyState
            title="No connections found"
            description="Try adjusting your search or filter criteria"
          />
        )}
      </div>
    </div>
  );
}
