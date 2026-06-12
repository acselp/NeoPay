import { ReadingsTabProps } from "../../types";
import { EmptyState, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../../../components/ui";
import { Badge, Gauge, Table } from "lucide-react";

export const ReadingsTab = ({ readings }: ReadingsTabProps) => {
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
