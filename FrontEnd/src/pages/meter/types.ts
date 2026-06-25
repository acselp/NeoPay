export interface Meter {
    Id: number;
    SerialNumber: string;
    Status: MeterStatus;
    Description?: string;
}

export interface CreateUpdateProps {
    active: boolean;
    onClose: () => void;
    onSubmit?: (model: Meter) => void;
    model?: Meter | null;
}

export enum MeterStatus {
    Active = 0,
    Inactive = 1,
}
