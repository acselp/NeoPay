import { ConnectionsTabProps } from "../../types";
import { EmptyState, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../components/ui";
import { Badge, Cable, MapPin, Table } from "lucide-react";

export const ConnectionsTab = ({ connections, customerId, navigate }: ConnectionsTabProps) => {
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
                                        title="TableUi connection"
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
