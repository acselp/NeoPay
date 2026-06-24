import {ApiTableStrategyProps, TableStrategy} from "../../../components/data-table/types";
import {AdminTableEntities} from "../../../services/admin-table-service/types";
import {Unit} from "../types";
import {Pencil, Trash2} from "lucide-react";
import {Badge} from '../../../components/ui';

interface SchemaArgs {
    onEdit: (model: Unit) => void;
    onDelete: (model: Unit) => void;
}

export const GetSchema = ({ onEdit, onDelete }: SchemaArgs): ApiTableStrategyProps<Unit> => {
    return {
        mode: TableStrategy.Api,
        entity: AdminTableEntities.Unit,
        schema: {
            columns: [
                {
                    id: "code",
                    header: "Unit",
                    cell: ({ row }) => (
                        <div>
                            <div className="font-medium text-gray-900">
                                { row.original.LongName }
                            </div>
                            <div className="text-gray-500 text-xs">
                                { row.original.Code }
                            </div>
                        </div>
                    ),
                },
                {
                    id: "symbol",
                    header: "Symbol",
                    cell: ({ row }) => (
                        <Badge variant="default">{row.original.Symbol}</Badge>
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
    } as ApiTableStrategyProps<Unit>
}
