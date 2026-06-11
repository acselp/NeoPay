import {ApiTableStrategyProps, TableStrategy} from "../../components/data-table/types";
import {AdminTableEntities} from "../../services/admin-table-service/types";
import {Customer} from "./types";
import {Badge, Cable, Eye, Link} from "lucide-react";

export const GetSchema = () => {
    return {
        schema: {
            columns: [
                {
                    header: "Customer",
                    accessorFn: (row: Customer) => `${row.FirstName} ${row.LastName}`,
                    cell: (info) => (
                        <div>
                            <div className="font-medium text-gray-900">
                                {info.getValue()}
                            </div>
                            <div className="text-gray-500 text-xs">
                                Since {new Date().toLocaleDateString()}
                            </div>
                        </div>
                    )
                },
                {
                    header: "Contact",
                    cell: ({ row }) => (
                        <>
                            <div className="text-gray-900">{row.original.FirstName}</div>
                            <div className="text-gray-500 text-xs">{row.original.FirstName}</div>
                        </>
                    )
                },
                {
                    header: "Status",
                    cell: ({ row }) => (
                        <>
                            <Badge>{row.original.FirstName}</Badge>
                        </>
                    )
                },
                {
                    header: "Connections",
                    cell: ({ row }) => (
                        <div className="flex items-center gap-2">
                            <span className="font-medium">{row.original.FirstName}</span>
                            <span className="text-gray-500">/ {row.original.FirstName}</span>
                            {row.original.FirstName && (
                                <span className="w-2 h-2 bg-orange-500 rounded-full" title="Missing recent readings" />
                            )}
                        </div>
                    )
                },
                {
                    header: "Last Reading",
                    cell: () => ('No readings')
                },
                {
                    header: "Actions",
                    cell: ({ row }) => (
                        <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                            <Link
                                to={`/customers/${row.original.FirstName}`}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                                title="View customer"
                            >
                                <Eye className="h-4 w-4" />
                            </Link>
                            <Link
                                to={`/customers/${row.original.FirstName}/connections/new`}
                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                                title="Add connection"
                            >
                                <Cable className="h-4 w-4" />
                            </Link>
                        </div>
                    )
                },
            ]
        },
        entity: AdminTableEntities.Customer,
        mode: TableStrategy.Api
    } as ApiTableStrategyProps
}

