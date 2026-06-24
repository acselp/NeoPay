import type { NavigateFunction } from 'react-router-dom';
import type {
  Connection,
  Location,
  Meter,
  Reading,
  Utility,
} from '../../types';

export interface Customer {
    Id: number;
    FirstName: string;
    LastName: string;
    Email?: string | null;
    Phone?: string | null;
    AccountNr: number;
    Status: CustomerStatus;
    Notes: string | null;
    CreatedOn: number;
    UpdatedOn: number;
}

export enum CustomerStatus {
    Active = 0,
    Inactive = 1,
}

export enum ConnectionStatus {
    Active = 0,
    Inactive = 1,
}

export interface CreateUpdateProps {
    active: boolean;
    onClose: () => void;
    onSubmit?: (model: Customer) => void;
    model?: Customer;
}

export interface CreateConnectionProps {
    active: boolean;
    onClose: () => void;
    onSubmit?: (model: CreateConnectionModel) => void;
    customerId: number;
}

export interface CreateConnectionModel {
    UtilityId: number;
    CustomerId: number;
    Status: ConnectionStatus;
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
