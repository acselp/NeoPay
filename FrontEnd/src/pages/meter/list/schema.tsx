import {ApiTableStrategyProps, TableStrategy} from "../../../components/data-table/types";
import {AdminTableEntities} from "../../../services/admin-table-service/types";
import {Pencil, Trash2} from "lucide-react";
import {Badge} from '../../../components/ui';
import { Meter, MeterStatus } from "../types";
import {mapStatusToVariantBadge} from "../../customer/helpers";

interface SchemaArgs {
    onEdit: (model: Meter) => void;
    onDelete: (model: Meter) => void;
}

export const GetSchema = ({ onEdit, onDelete }: SchemaArgs): ApiTableStrategyProps<Meter> => {
    return {
        mode: TableStrategy.Api,
        entity: AdminTableEntities.Meter,
        schema: {
            columns: [
                {
                    id: "serial_number",
                    header: "Serial Number",
                    cell: ({ row }) => (
                        row.original.SerialNumber
                    ),
                },
                {
                    id: "status",
                    header: "status",
                    cell: ({ row }) => (
                        <Badge variant={ mapStatusToVariantBadge(row.original.Status) }>{MeterStatus[row.original.Status]}</Badge>
                    ),
                },
                {
                    id: "description",
                    header: "Description",
                    cell: ({ row }) => (
                        <span className="text-gray-500 text-sm">
                            {row.original.Description || '—'}
                        </span>
                    ),
                },
                {
                    id: "actions",
                    header: () => <span className="w-full text-right block"> Actions </span>,
                    cell: ({ row }) => (
                        <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                            <div
                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"
                                title="Edit unit"
                                onClick={() => onEdit(row.original)}
                            >
                                <Pencil className="h-4 w-4" />
                            </div>
                            <div
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                                title="Delete unit"
                                onClick={() => onDelete(row.original)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </div>
                        </div>
                    ),
                },
            ]
        }
    } as ApiTableStrategyProps<Meter>
}
