import { useMemo } from "react";
import { DataTable } from "../../../components/data-table/data-table";
import { GridFilter } from "../../../services/admin-table-service/types";
import { GetSchema } from "./schema";

export interface ConnectionsTableProps {
    /** When provided, the table only shows connections for this customer. */
    customerId?: number;
}

/**
 * Reusable connections list, backed by the AdminTable API.
 * - Pass `customerId` to scope it to a single customer (customer details tab).
 * - Omit it to show every connection (standalone connections page).
 */
export const ConnectionsTable = ({ customerId }: ConnectionsTableProps) => {
    const schema = useMemo(() => GetSchema({ hideCustomer: !!customerId }), [customerId]);

    const filters = useMemo<GridFilter[]>(
        () => (customerId ? [{ Property: "CustomerId", Value: String(customerId) }] : []),
        [customerId]
    );

    return <DataTable {...schema} filters={filters} />;
};
