export interface Tariff {
    Id?: number;
    Title: string;
    UnitPrice: number;
    UtilityId: number;
}

export interface CreateUpdateTariffProps {
    active: boolean;
    onClose: () => void;
    onSubmit?: (model: Tariff) => void;
    model?: Tariff | null;
    utilityId: number;
}
