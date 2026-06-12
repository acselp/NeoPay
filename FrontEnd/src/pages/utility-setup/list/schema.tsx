import { ApiTableStrategyProps, RichTableSchema, TableStrategy } from "../../../components/data-table/types"
import { UtilityModel } from "../types"
import {Badge} from '../../../components/ui';
import { AdminTableEntities } from "../../../services/admin-table-service/types";


export const GetSchema = (): ApiTableStrategyProps<UtilityModel> => {
    return {
        mode: TableStrategy.Api,
        entity: AdminTableEntities.Utility,
        schema: {
            columns: [
                {
                    id: "name",
                    header: "Utility",
                    cell: ({ row }) => (
                        <div>
                            <div className="font-medium text-gray-900">
                                { row.original.Name }
                            </div>
                            <div className="text-gray-500 text-xs">
                                Creaated { row.original.CreatedOn ? new Date(row.original.CreatedOn).toLocaleDateString() : "Invalid Date"}
                            </div>
                        </div>
                    ),
                },
                {
                    id: "unitType",
                    header: "Unit type",
                    cell: ({ row }) => (
                        <Badge variant="default">{row.original.UnitType}</Badge>
                    )
                },
                {
                    id: "actions",
                    header: () => <div className="w-full text-right">Actions</div>,
                    cell: ({ row }) => (
                        <Badge variant="default">{row.original.UnitType}</Badge>
                    )
                }
            ]
        }
    }
}