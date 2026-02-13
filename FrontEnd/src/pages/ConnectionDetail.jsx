import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Gauge,
  RefreshCw,
  Power,
  Calendar,
  Clock,
  Plus,
  AlertTriangle,
  CheckCircle,
  MapPin,
} from 'lucide-react';
import {
  Button,
  Badge,
  Card,
  CardTitle,
  Breadcrumbs,
  EmptyState,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Modal,
} from '../components/ui';
import {
  getConnection,
  getCustomer,
  getLocation,
  getUtility,
  getConnectionMeter,
  getMeterReadings,
  meterHistory,
  calculateConsumption,
} from '../data/mockData';
import AddReadingModal from '../components/AddReadingModal';

export default function ConnectionDetail() {
  const { connectionId } = useParams();
  const navigate = useNavigate();
  const [showAddReading, setShowAddReading] = useState(false);
  const [showReplaceMeter, setShowReplaceMeter] = useState(false);

  const connection = getConnection(connectionId);

  if (!connection) {
    return (
      <div className="p-8">
        <EmptyState
          title="Connection not found"
          description="The connection you're looking for doesn't exist or has been removed."
          action={() => navigate('/connections')}
          actionLabel="Back to Connections"
        />
      </div>
    );
  }

  const customer = getCustomer(connection.customerId);
  const location = getLocation(connection.locationId);
  const utility = getUtility(connection.utilityId);
  const meter = getConnectionMeter(connection.id);
  const readings = meter ? getMeterReadings(meter.id) : [];
  const latestReading = readings.length > 0 ? readings[0] : null;

  // Get meter history for this connection
  const history = meterHistory.filter(h => h.connectionId === connection.id);

  // Calculate consumption for readings
  const readingsWithConsumption = readings.map((reading, index) => {
    const previousReading = readings[index + 1];
    const consumption = previousReading
      ? calculateConsumption(reading.value, previousReading.value, utility?.rolloverValue)
      : null;
    return { ...reading, consumption };
  });

  return (
    <div className="p-8">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Customers', href: '/customers' },
          { label: customer?.name, href: `/customers/${customer?.id}` },
          { label: `${utility?.name} Connection` },
        ]}
      />

      {/* Header */}
      <div className="flex items-start justify-between mt-4 mb-6">
        <div>
          <div className="flex items-center gap-3">
            <div
              className={`w-3 h-3 rounded-full ${
                utility?.name === 'Electricity'
                  ? 'bg-yellow-400'
                  : utility?.name === 'Water'
                  ? 'bg-blue-400'
                  : 'bg-orange-400'
              }`}
            />
            <h1 className="text-2xl font-bold text-gray-900">
              {utility?.name} Connection
            </h1>
            <Badge variant={connection.status}>{connection.status}</Badge>
          </div>
          <div className="flex items-center gap-2 text-gray-500 mt-2">
            <MapPin className="h-4 w-4" />
            <span>{location?.label} - {location?.address}, {location?.city}</span>
          </div>
          <div className="text-sm text-gray-400 mt-1">
            Account: {connection.accountNumber}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {connection.status === 'active' && meter && (
            <Button onClick={() => setShowAddReading(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Reading
            </Button>
          )}
          {connection.status === 'active' ? (
            <Button variant="secondary" onClick={() => setShowReplaceMeter(true)}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Replace Meter
            </Button>
          ) : (
            <Button variant="secondary">
              <Power className="h-4 w-4 mr-2" />
              Reactivate
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Meter */}
          <Card>
            <CardTitle className="mb-4 flex items-center gap-2">
              <Gauge className="h-5 w-5 text-gray-400" />
              Current Meter
            </CardTitle>
            {meter ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Serial Number</p>
                  <p className="font-mono font-medium">{meter.serialNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Model</p>
                  <p className="font-medium">{meter.manufacturer} {meter.model}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Installed</p>
                  <p className="font-medium">
                    {new Date(meter.installDate).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Configuration</p>
                  <p className="font-medium">{meter.digits} digits × {meter.multiplier}</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-6">
                <AlertTriangle className="h-10 w-10 text-yellow-500 mx-auto mb-2" />
                <p className="text-gray-600 font-medium">No meter assigned</p>
                <p className="text-sm text-gray-500 mb-4">
                  Assign a meter to start recording readings.
                </p>
                <Button size="sm">Assign Meter</Button>
              </div>
            )}
          </Card>

          {/* Latest Readings */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-400" />
                Reading History
              </CardTitle>
              {readings.length > 5 && (
                <Link
                  to={`/readings?connection=${connection.id}`}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  View all
                </Link>
              )}
            </div>
            {readingsWithConsumption.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Consumption</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Recorded By</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {readingsWithConsumption.slice(0, 5).map((reading) => (
                    <TableRow key={reading.id}>
                      <TableCell className="font-medium">
                        {new Date(reading.readingDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {reading.value.toLocaleString()} {utility?.unit}
                      </TableCell>
                      <TableCell>
                        {reading.consumption !== null ? (
                          <span className="text-green-600 font-medium">
                            +{reading.consumption.toLocaleString()} {utility?.unit}
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant={reading.source === 'smart-meter' ? 'active' : 'default'}>
                          {reading.source}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-500">
                        {reading.createdBy}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <EmptyState
                icon={Gauge}
                title="No readings yet"
                description="Record the first reading for this connection."
                action={meter ? () => setShowAddReading(true) : undefined}
                actionLabel={meter ? 'Add Reading' : undefined}
              />
            )}
          </Card>

          {/* Meter History */}
          {history.length > 0 && (
            <Card>
              <CardTitle className="mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-400" />
                Meter History
              </CardTitle>
              <div className="space-y-4">
                {history.map((event, index) => (
                  <div key={event.id} className="flex items-start gap-3">
                    <div
                      className={`mt-1 w-2 h-2 rounded-full ${
                        event.action === 'installed' ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">
                        Meter {event.action === 'installed' ? 'installed' : 'removed'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(event.date).toLocaleDateString()} by {event.performedBy}
                      </p>
                      {event.notes && (
                        <p className="text-sm text-gray-600 mt-1">{event.notes}</p>
                      )}
                      {event.finalReading !== undefined && (
                        <p className="text-sm text-gray-500">
                          Final reading: {event.finalReading.toLocaleString()} {utility?.unit}
                        </p>
                      )}
                      {event.initialReading !== undefined && (
                        <p className="text-sm text-gray-500">
                          Initial reading: {event.initialReading.toLocaleString()} {utility?.unit}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Connection Info */}
          <Card>
            <CardTitle className="mb-4">Connection Info</CardTitle>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Customer</p>
                <Link
                  to={`/customers/${customer?.id}`}
                  className="font-medium text-blue-600 hover:text-blue-700"
                >
                  {customer?.name}
                </Link>
              </div>
              <div>
                <p className="text-sm text-gray-500">Utility</p>
                <p className="font-medium">{utility?.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Start Date</p>
                <p className="font-medium">
                  {new Date(connection.startDate).toLocaleDateString()}
                </p>
              </div>
              {connection.endDate && (
                <div>
                  <p className="text-sm text-gray-500">End Date</p>
                  <p className="font-medium">
                    {new Date(connection.endDate).toLocaleDateString()}
                  </p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-500">Last Updated</p>
                <p className="text-sm text-gray-600">
                  {new Date(connection.updatedAt).toLocaleDateString()} by {connection.updatedBy}
                </p>
              </div>
            </div>
          </Card>

          {/* Latest Reading Summary */}
          {latestReading && (
            <Card>
              <CardTitle className="mb-4">Latest Reading</CardTitle>
              <div className="text-center py-4">
                <p className="text-3xl font-bold text-gray-900">
                  {latestReading.value.toLocaleString()}
                </p>
                <p className="text-gray-500">{utility?.unit}</p>
                <p className="text-sm text-gray-400 mt-2">
                  {new Date(latestReading.readingDate).toLocaleDateString()}
                </p>
                {readingsWithConsumption[0]?.consumption !== null && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500">Last period consumption</p>
                    <p className="text-xl font-semibold text-green-600">
                      {readingsWithConsumption[0].consumption.toLocaleString()} {utility?.unit}
                    </p>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Actions */}
          <Card>
            <CardTitle className="mb-4">Actions</CardTitle>
            <div className="space-y-2">
              {connection.status === 'active' ? (
                <>
                  <Button variant="secondary" className="w-full justify-start">
                    <Power className="h-4 w-4 mr-2 text-red-500" />
                    Disconnect
                  </Button>
                </>
              ) : (
                <Button variant="secondary" className="w-full justify-start">
                  <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                  Reactivate
                </Button>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Add Reading Modal */}
      <AddReadingModal
        isOpen={showAddReading}
        onClose={() => setShowAddReading(false)}
        connection={connection}
        meter={meter}
        utility={utility}
        latestReading={latestReading}
      />

      {/* Replace Meter Modal - Placeholder */}
      <Modal
        isOpen={showReplaceMeter}
        onClose={() => setShowReplaceMeter(false)}
        title="Replace Meter"
        size="lg"
      >
        <p className="text-gray-600">
          Meter replacement workflow coming soon. This will allow you to:
        </p>
        <ul className="list-disc list-inside mt-2 text-gray-600 space-y-1">
          <li>Record the final reading of the current meter</li>
          <li>Select or create a new meter</li>
          <li>Record the initial reading of the new meter</li>
          <li>Maintain full audit history</li>
        </ul>
        <div className="mt-6 flex justify-end">
          <Button variant="secondary" onClick={() => setShowReplaceMeter(false)}>
            Close
          </Button>
        </div>
      </Modal>
    </div>
  );
}
