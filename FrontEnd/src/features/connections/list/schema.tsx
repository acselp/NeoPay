import { ApiTableStrategyProps, TableStrategy } from "../../../components/data-table/types";
import { AdminTableEntities } from "../../../services/admin-table-service/types";
import { ConnectionRow, ConnectionStatus } from "../types";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "../../../components/ui";

const statusBadgeVariant = (status: ConnectionStatus) =>
    status === ConnectionStatus.Active ? "active" : "default";

interface SchemaArgs {
    /** Hide the customer column (e.g. when the table is already scoped to one customer). */
    hideCustomer?: boolean;
}

export const GetSchema = ({ hideCustomer }: SchemaArgs = {}): ApiTableStrategyProps<ConnectionRow> => {
    const columns = [
        {
            id: "customer",
            header: "Customer",
            cell: ({ row }: any) => (
                <div className="font-medium text-gray-900">
                    {row.original.CustomerName ?? `#${row.original.CustomerId}`}
                </div>
            ),
        },
        {
            id: "utility",
            header: "Utility",
            cell: ({ row }: any) => (
                <span className="text-gray-900">
                    {row.original.UtilityName ?? `#${row.original.UtilityId}`}
                </span>
            ),
        },
        {
            id: "description",
            header: "Description",
            cell: ({ row }: any) => row.original.Description,
        },
        {
            id: "status",
            header: "Status",
            cell: ({ row }: any) => (
                <Badge variant={statusBadgeVariant(row.original.Status)}>
                    {ConnectionStatus[row.original.Status]}
                </Badge>
            ),
        },
        {
            id: "actions",
            header: () => <span className="w-full text-right block"> Actions </span>,
            cell: ({ row }: any) => (
                <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                    <Link
                        to={`/connections/${row.original.Id}`}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                        title="View connection"
                    >
                        <Eye className="h-4 w-4" />
                    </Link>
                </div>
            ),
        },
    ].filter((col) => !(hideCustomer && col.id === "customer"));

    return {
        mode: TableStrategy.Api,
        entity: AdminTableEntities.Connection,
        schema: {
            columns,
        },
    } as ApiTableStrategyProps<ConnectionRow>;
};
