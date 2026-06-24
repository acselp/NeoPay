import { ApiTableStrategyProps, TableStrategy } from "../../../components/data-table/types"
import { UtilityModel } from "../types"
import { Badge } from '../../../components/ui';
import { AdminTableEntities } from "../../../services/admin-table-service/types";
import { Pencil, Trash2 } from "lucide-react";

interface SchemaArgs {
    onEdit: (model: UtilityModel) => void;
    onDelete: (model: UtilityModel) => void;
}

export const GetSchema = ({ onEdit, onDelete }: SchemaArgs): ApiTableStrategyProps<UtilityModel> => {
    return {
        mode: TableStrategy.Api,
        entity: AdminTableEntities.Utility,
        schema: {
            columns: [
                {
                    id: "name",
                    header: "Utility",
                    cell: ({ row }) => (
                        <div className="font-medium text-gray-900">
                            { row.original.Name }
                        </div>
                    ),
                },
                {
                    id: "unit",
                    header: "Unit",
                    cell: ({ row }) => (
                        row.original.Unit
                            ? <Badge variant="default">{row.original.Unit.LongName} ({row.original.Unit.Symbol})</Badge>
                            : <span className="text-gray-400">—</span>
                    ),
                },
                {
                    id: "actions",
                    header: () => <span className="w-full text-right block"> Actions </span>,
                    cell: ({ row }) => (
                        <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                            <div
                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"
                                title="Edit utility"
                                onClick={() => onEdit(row.original)}
                            >
                                <Pencil className="h-4 w-4" />
                            </div>
                            <div
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                                title="Delete utility"
                                onClick={() => onDelete(row.original)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </div>
                        </div>
                    ),
                },
            ]
        }
    } as ApiTableStrategyProps<UtilityModel>
}
