import { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Plus, Upload, Download, Gauge } from 'lucide-react';
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
  Modal,
  Card,
  CardTitle,
} from '../components/ui';
import {
  readings,
  meters,
  connections,
  utilities,
  getCustomer,
  getLocation,
  getConnection,
  getUtility,
  calculateConsumption,
} from '../data/mockData';

export default function ReadingsList() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const connectionFilter = searchParams.get('connection');

  const [search, setSearch] = useState('');
  const [utilityFilter, setUtilityFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [showBulkImport, setShowBulkImport] = useState(false);

  // Build enriched readings data
  const enrichedReadings = useMemo(() => {
    return readings
      .map((reading) => {
        const meter = meters.find((m) => m.id === reading.meterId);
        const connection = meter
          ? connections.find((c) => c.id === meter.connectionId)
          : null;
        const customer = connection ? getCustomer(connection.customerId) : null;
        const utility = connection ? getUtility(connection.utilityId) : null;
        const location = connection ? getLocation(connection.locationId) : null;

        // Find previous reading for consumption calculation
        const meterReadings = readings
          .filter((r) => r.meterId === reading.meterId)
          .sort((a, b) => new Date(b.readingDate) - new Date(a.readingDate));
        const currentIndex = meterReadings.findIndex((r) => r.id === reading.id);
        const previousReading = meterReadings[currentIndex + 1];
        const consumption = previousReading
          ? calculateConsumption(
              reading.value,
              previousReading.value,
              utility?.rolloverValue
            )
          : null;

        return {
          ...reading,
          meter,
          connection,
          customer,
          utility,
          location,
          consumption,
        };
      })
      .sort((a, b) => new Date(b.readingDate) - new Date(a.readingDate));
  }, []);

  // Apply filters
  const filteredReadings = useMemo(() => {
    return enrichedReadings.filter((reading) => {
      // Connection filter (from URL)
      if (connectionFilter && reading.connection?.id !== connectionFilter) {
        return false;
      }

      // Search filter
      if (search) {
        const searchLower = search.toLowerCase();
        if (
          !reading.customer?.name.toLowerCase().includes(searchLower) &&
          !reading.meter?.serialNumber.toLowerCase().includes(searchLower) &&
          !reading.location?.address.toLowerCase().includes(searchLower)
        ) {
          return false;
        }
      }

      // Utility filter
      if (utilityFilter && reading.utility?.id !== utilityFilter) {
        return false;
      }

      // Source filter
      if (sourceFilter && reading.source !== sourceFilter) {
        return false;
      }

      return true;
    });
  }, [enrichedReadings, connectionFilter, search, utilityFilter, sourceFilter]);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Readings</h1>
          <p className="text-gray-500 mt-1">
            View and manage consumption readings across all connections
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" onClick={() => setShowBulkImport(true)}>
            <Upload className="h-4 w-4 mr-2" />
            Bulk Import
          </Button>
          <Button variant="secondary">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <SearchInput
              value={search}
              onChange={setSearch}
              placeholder="Search by customer, meter, or address..."
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
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            placeholder="All sources"
            options={[
              { value: 'manual', label: 'Manual' },
              { value: 'smart-meter', label: 'Smart Meter' },
            ]}
            className="w-40"
          />
          {connectionFilter && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/readings')}
            >
              Clear connection filter
            </Button>
          )}
        </div>
      </div>

      {/* Results count */}
      <div className="text-sm text-gray-500 mb-4">
        Showing {filteredReadings.length} of {readings.length} readings
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {filteredReadings.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Utility</TableHead>
                <TableHead>Meter</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Consumption</TableHead>
                <TableHead>Source</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredReadings.map((reading) => (
                <TableRow
                  key={reading.id}
                  onClick={() =>
                    navigate(`/connections/${reading.connection?.id}`)
                  }
                  className="cursor-pointer"
                >
                  <TableCell className="font-medium text-gray-900">
                    {new Date(reading.readingDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900">
                        {reading.customer?.name || 'Unknown'}
                      </div>
                      <div className="text-xs text-gray-500">
                        {reading.location?.label}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          reading.utility?.name === 'Electricity'
                            ? 'bg-yellow-400'
                            : reading.utility?.name === 'Water'
                            ? 'bg-blue-400'
                            : 'bg-orange-400'
                        }`}
                      />
                      {reading.utility?.name}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {reading.meter?.serialNumber}
                  </TableCell>
                  <TableCell className="font-medium">
                    {reading.value.toLocaleString()} {reading.utility?.unit}
                  </TableCell>
                  <TableCell>
                    {reading.consumption !== null ? (
                      <span className="text-green-600 font-medium">
                        +{reading.consumption.toLocaleString()}{' '}
                        {reading.utility?.unit}
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        reading.source === 'smart-meter' ? 'active' : 'default'
                      }
                    >
                      {reading.source}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <EmptyState
            icon={Gauge}
            title="No readings found"
            description="Try adjusting your search or filter criteria"
          />
        )}
      </div>

      {/* Bulk Import Modal */}
      <Modal
        isOpen={showBulkImport}
        onClose={() => setShowBulkImport(false)}
        title="Bulk Import Readings"
        size="lg"
      >
        <Card className="bg-gray-50 border-dashed">
          <div className="text-center py-8">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 font-medium mb-2">
              Drag and drop your CSV file here
            </p>
            <p className="text-sm text-gray-500 mb-4">or click to browse</p>
            <Button variant="secondary" size="sm">
              Select File
            </Button>
          </div>
        </Card>

        <div className="mt-6">
          <CardTitle className="text-base mb-3">Expected Format</CardTitle>
          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
            <code className="text-sm text-green-400">
              meter_serial,reading_date,value
              <br />
              EM-2024-00125,2024-06-15,2650
              <br />
              WM-2024-00089,2024-06-15,225.5
            </code>
          </div>
          <p className="text-sm text-gray-500 mt-3">
            Download a{' '}
            <button className="text-blue-600 hover:text-blue-700">
              template file
            </button>{' '}
            to get started.
          </p>
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
          <Button variant="secondary" onClick={() => setShowBulkImport(false)}>
            Cancel
          </Button>
          <Button disabled>Import Readings</Button>
        </div>
      </Modal>
    </div>
  );
}
