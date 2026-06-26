import {ApiTableStrategyProps, TableStrategy} from "../../../components/data-table/types";
import {AdminTableEntities} from "../../../services/admin-table-service/types";
import { MeterReadingListModel } from "../types";

interface SchemaArgs {
    onEdit: (model: MeterReadingListModel) => void;
    onDelete: (model: MeterReadingListModel) => void;
}

export const GetSchema = (): ApiTableStrategyProps<MeterReadingListModel> => {
    return {
        mode: TableStrategy.Api,
        entity: AdminTableEntities.MeterReading,
        schema: {
            columns: [
                {
                    id: "customer",
                    header: "Customer",
                    cell: ({ row }) => row.original.CustomerName
                },
                {
                    id: "value",
                    header: "Value",
                    cell: ({ row }) => row.original.Value
                },
                {
                    id: "serial_number",
                    header: "Serial Number",
                    cell: ({ row }) => row.original.MeterSerialNumber
                },
                {
                    id: "utility",
                    header: "Utility",
                    cell: ({ row }) => row.original.UtilityName
                },
                {
                    id: "date",
                    header: "Date",
                    cell: ({ row }) => row.original.FormatedDate
                },
            ]
        }
    } as ApiTableStrategyProps<MeterReadingListModel>
}
