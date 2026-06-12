import type { NavigateFunction } from 'react-router-dom';
import type {
  Connection,
  Customer as DomainCustomer,
  Location,
  Meter,
  Reading,
  Utility,
} from '../../types';

export interface Customer {
    Id: number;
    FullName: string;
    Email?: string | null;
    Phone?: string | null;
    AccountNr: number;
    Status: CustomerStatus;
    Notes: string | null;
    CreatedOn: number;
}

export enum CustomerStatus {
    Active = 0,
    Inactive = 1,
}

export interface CreateUpdateProps {
    active: boolean;
    onClose: () => void;
    onSubmit?: (model: Customer) => void;
    model?: Customer;
}

export interface CustomerReading {
    reading: Reading;
    meter?: Meter;
    conn?: Connection;
    utility?: Utility | null;
    location?: Location | null;
}

export interface ConnectionsTabProps {
    connections: Connection[];
    customerId?: string;
    navigate: NavigateFunction;
}

export interface ReadingsTabProps {
    readings: CustomerReading[];
}

export interface NotesTabProps {
    customer: Customer;
}
