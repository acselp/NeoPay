import { TariffsTable, TariffRow } from "../../../../features/tariffs";

interface TariffsTabProps {
    utilityId: number;
    onEdit: (model: TariffRow) => void;
    onDelete: (model: TariffRow) => void;
    refreshKey?: number;
}

export const TariffsTab = ({ utilityId, onEdit, onDelete, refreshKey }: TariffsTabProps) => {
    return (
        <TariffsTable
            utilityId={utilityId}
            onEdit={onEdit}
            onDelete={onDelete}
            refreshKey={refreshKey}
        />
    );
};
