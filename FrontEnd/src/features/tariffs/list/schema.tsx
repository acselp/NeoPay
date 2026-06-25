import { ApiTableStrategyProps, TableStrategy } from "../../../components/data-table/types";
import { AdminTableEntities } from "../../../services/admin-table-service/types";
import { TariffRow } from "../types";
import { Pencil, Trash2 } from "lucide-react";

interface SchemaArgs {
    onEdit: (model: TariffRow) => void;
    onDelete: (model: TariffRow) => void;
}

export const GetSchema = ({ onEdit, onDelete }: SchemaArgs): ApiTableStrategyProps<TariffRow> => {
    return {
        mode: TableStrategy.Api,
        entity: AdminTableEntities.Tariff,
        schema: {
            columns: [
                {
                    id: "title",
                    header: "Title",
                    cell: ({ row }: any) => (
                        <div className="font-medium text-gray-900">
                            {row.original.Title}
                        </div>
                    ),
                },
                {
                    id: "unit_price",
                    header: "Unit price",
                    cell: ({ row }: any) => (
                        <span className="text-gray-900">
                            {row.original.UnitPrice}
                        </span>
                    ),
                },
                {
                    id: "actions",
                    header: () => <span className="w-full text-right block"> Actions </span>,
                    cell: ({ row }: any) => (
                        <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                            <div
                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg cursor-pointer"
                                title="Edit tariff"
                                onClick={() => onEdit(row.original)}
                            >
                                <Pencil className="h-4 w-4" />
                            </div>
                            <div
                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                                title="Delete tariff"
                                onClick={() => onDelete(row.original)}
                            >
                                <Trash2 className="h-4 w-4" />
                            </div>
                        </div>
                    ),
                },
            ],
        },
    } as ApiTableStrategyProps<TariffRow>;
};
