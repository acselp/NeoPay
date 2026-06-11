export interface Customer {
    FirstName: string;
    LastName: string;
    Email?: string | null;
    Phone?: string | null;
    AccountNr: number;
    Status: CustomerStatus;
    Notes: string | null;
}

export enum CustomerStatus {
    Active = 0,
    Inactive = 1,
}