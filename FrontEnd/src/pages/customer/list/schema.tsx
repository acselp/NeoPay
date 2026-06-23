import {ApiTableStrategyProps, TableStrategy} from "../../../components/data-table/types";
import {AdminTableEntities} from "../../../services/admin-table-service/types";
import {Customer, CustomerStatus} from "../types";
import {Cable, Eye, Pencil} from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import {Badge} from '../../../components/ui';
import { mapStatusToVariantBadge } from "../helpers";

export const GetSchema = ({ navigate, onEdit }) => {
    return {
        schema: {
            table: {
                row: {
                    onRowClick: (row) => { navigate(`/customers/${row.Id}`) }
                }
            },
            columns: [
                {
                    header: "Customer",
                    cell: ({ row }) => (
                        <div>
                            <div className="font-medium text-gray-900">
                                { row.original.FirstName } { row.original.LastName }
                            </div>
                            <div className="text-gray-500 text-xs">
                                Since {new Date(row.original.CreatedOn ?? new Date()).toLocaleDateString()}
                            </div>
                        </div>
                    )
                },
                {
                    header: "Contact",
                    cell: ({ row }) => (
                        <>
                            <div className="text-gray-900">{row.original.Email}</div>
                            <div className="text-gray-500 text-xs">{row.original.Phone}</div>
                        </>
                    )
                },
                {
                    header: "Status",
                    cell: ({ row }) => (
                        <>
                            <Badge variant={mapStatusToVariantBadge(row.original.Status)}>{CustomerStatus[row.original.Status]}</Badge>
                        </>
                    )
                },
                {
                    header: "Account number",
                    cell: ({ row }) => (
                        <>
                            {row.original.AccountNr}
                        </>
                    )
                },
                // {
                //     header: "Connections",
                //     cell: ({ row }) => (
                //         <div className="flex items-center gap-2">
                //             <span className="font-medium">{row.original.FirstName}</span>
                //             <span className="text-gray-500">/ {row.original.FirstName}</span>
                //             {row.original.FirstName && (
                //                 <span className="w-2 h-2 bg-orange-500 rounded-full" title="Missing recent readings" />
                //             )}
                //         </div>
                //     )
                // },
                {
                    header: "Last Reading",
                    cell: () => ('No readings')
                },
                {
                    id: "actions",
                    header: () => <span className="w-full text-right block"> Actions </span>,
                    cell: ({ row }) => (
                        <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                            <Link
                                to={`/customers/${row.original.Id}`}
                                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                                title="View customer"
                            >
                                <Eye className="h-4 w-4" />
                            </Link>
                            <div
                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                                title="Add connection"
                                onClick={() => {onEdit(row.original)}}
                            >
                                <Pencil className="h-4 w-4" />
                            </div>
                            <Link
                                to={`/customers/${row.original.Id}/connections/new`}
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
    } as ApiTableStrategyProps<Customer>
}
