import { Link } from 'react-router-dom';
import { Users, Cable, Gauge, AlertTriangle, TrendingUp, Clock } from 'lucide-react';
import { KPICard, Card, CardTitle, Badge, Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui';
import {
  customers,
  connections,
  readings,
  meters,
  getCustomer,
  getLocation,
  getUtility,
  getConnectionMeter,
  getLatestReading,
} from '../data/mockData';

export default function Dashboard() {
  const activeConnections = connections.filter(c => c.status === 'active').length;
  const pendingConnections = connections.filter(c => c.status === 'pending').length;
  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.status === 'active').length;

  // Find connections missing recent readings (no reading in last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const connectionsNeedingReadings = connections
    .filter(conn => conn.status === 'active')
    .map(conn => {
      const meter = getConnectionMeter(conn.id);
      const latestReading = meter ? getLatestReading(meter.id) : null;
      const needsReading = !latestReading || new Date(latestReading.readingDate) < thirtyDaysAgo;
      return { conn, meter, latestReading, needsReading };
    })
    .filter(item => item.needsReading)
    .slice(0, 5);

  // Recent readings
  const recentReadings = [...readings]
    .sort((a, b) => new Date(b.readingDate) - new Date(a.readingDate))
    .slice(0, 5)
    .map(reading => {
      const meter = meters.find(m => m.id === reading.meterId);
      const conn = connections.find(c => c.id === meter?.connectionId);
      const customer = conn ? getCustomer(conn.customerId) : null;
      const utility = conn ? getUtility(conn.utilityId) : null;
      return { reading, meter, conn, customer, utility };
    });

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Overview of your utility management operations</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Total Customers"
          value={totalCustomers}
          subtitle={`${activeCustomers} active`}
          icon={Users}
        />
        <KPICard
          title="Active Connections"
          value={activeConnections}
          subtitle={`${pendingConnections} pending`}
          icon={Cable}
        />
        <KPICard
          title="Readings This Month"
          value={readings.filter(r => {
            const readingDate = new Date(r.readingDate);
            const now = new Date();
            return readingDate.getMonth() === now.getMonth() &&
                   readingDate.getFullYear() === now.getFullYear();
          }).length}
          icon={Gauge}
        />
        <KPICard
          title="Needs Attention"
          value={connectionsNeedingReadings.length}
          subtitle="Missing readings"
          icon={AlertTriangle}
        />
      </div>

      {/* Two column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Connections needing readings */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <CardTitle>
              <Clock className="h-5 w-5 inline mr-2 text-orange-500" />
              Connections Needing Readings
            </CardTitle>
            <Link to="/readings" className="text-sm text-blue-600 hover:text-blue-700">
              View all
            </Link>
          </div>
          {connectionsNeedingReadings.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Utility</TableHead>
                  <TableHead>Last Reading</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {connectionsNeedingReadings.map(({ conn, latestReading }) => {
                  const customer = getCustomer(conn.customerId);
                  const utility = getUtility(conn.utilityId);
                  return (
                    <TableRow key={conn.id}>
                      <TableCell className="font-medium text-gray-900">
                        {customer?.name}
                      </TableCell>
                      <TableCell>{utility?.name}</TableCell>
                      <TableCell className="text-gray-500">
                        {latestReading
                          ? new Date(latestReading.readingDate).toLocaleDateString()
                          : 'Never'}
                      </TableCell>
                      <TableCell>
                        <Link
                          to={`/connections/${conn.id}`}
                          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                        >
                          Add reading
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <p className="text-gray-500 text-sm py-8 text-center">
              All connections have recent readings
            </p>
          )}
        </Card>

        {/* Recent readings */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <CardTitle>
              <TrendingUp className="h-5 w-5 inline mr-2 text-green-500" />
              Recent Readings
            </CardTitle>
            <Link to="/readings" className="text-sm text-blue-600 hover:text-blue-700">
              View all
            </Link>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Utility</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentReadings.map(({ reading, customer, utility }) => (
                <TableRow key={reading.id}>
                  <TableCell className="font-medium text-gray-900">
                    {customer?.name || 'Unknown'}
                  </TableCell>
                  <TableCell>{utility?.name}</TableCell>
                  <TableCell>
                    {reading.value.toLocaleString()} {utility?.unit}
                  </TableCell>
                  <TableCell className="text-gray-500">
                    {new Date(reading.readingDate).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Quick actions */}
      <Card className="mt-6">
        <CardTitle className="mb-4">Quick Actions</CardTitle>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/customers"
            className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <Users className="h-4 w-4 mr-2" />
            View Customers
          </Link>
          <Link
            to="/connections"
            className="inline-flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-lg hover:bg-green-100 transition-colors"
          >
            <Cable className="h-4 w-4 mr-2" />
            Manage Connections
          </Link>
          <Link
            to="/readings"
            className="inline-flex items-center px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <Gauge className="h-4 w-4 mr-2" />
            Enter Readings
          </Link>
        </div>
      </Card>
    </div>
  );
}
