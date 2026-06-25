import { TariffsTab } from "./Tariffs";
import { TariffRow } from "../../../../features/tariffs";

interface GetTabsArgs {
    utilityId: number;
    onEdit: (model: TariffRow) => void;
    onDelete: (model: TariffRow) => void;
    refreshKey?: number;
}

export const GetTabs = ({ utilityId, onEdit, onDelete, refreshKey }: GetTabsArgs) => {
    return [
        {
            id: 'tariffs',
            label: 'Tariffs',
            content: (
                <TariffsTab
                    utilityId={utilityId}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    refreshKey={refreshKey}
                />
            ),
        },
    ];
};
