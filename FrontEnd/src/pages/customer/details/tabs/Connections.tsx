import { ConnectionsTable } from "../../../../features/connections";

export const ConnectionsTab = ({ customerId }: { customerId?: number }) => {
    return <ConnectionsTable customerId={customerId} />;
}
