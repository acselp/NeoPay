export interface ConnectionRow {
    Id: number;
    Status: ConnectionStatus;
    CustomerId: number;
    UtilityId: number;
    CustomerName?: string | null;
    UtilityName?: string | null;
}

export enum ConnectionStatus {
    Active = 0,
    Inactive = 1,
}
