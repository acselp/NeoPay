import { useMemo } from "react";
import { DataTable } from "../../../components/data-table/data-table";
import { GridFilter } from "../../../services/admin-table-service/types";
import { GetSchema } from "./schema";
import { TariffRow } from "../types";

export interface TariffsTableProps {
    /** The utility whose tariffs are shown. */
    utilityId: number;
    onEdit: (model: TariffRow) => void;
    onDelete: (model: TariffRow) => void;
    /** Bump to force a reload after a create/update/delete. */
    refreshKey?: number;
}

/**
 * Tariffs list for a single utility, backed by the AdminTable API.
 * Scoped to `utilityId` and reloaded whenever `refreshKey` changes.
 */
export const TariffsTable = ({ utilityId, onEdit, onDelete, refreshKey }: TariffsTableProps) => {
    const schema = useMemo(() => GetSchema({ onEdit, onDelete }), [onEdit, onDelete]);

    const filters = useMemo<GridFilter[]>(
        () => [{ Property: "UtilityId", Value: String(utilityId) }],
        [utilityId]
    );

    return <DataTable key={refreshKey} {...schema} filters={filters} />;
};
