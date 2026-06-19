import type { Utility } from '../../types';

export interface UtilityFormValues {
  name: string;
  unit: string;
  readingType: string;
  decimalsAllowed: number;
  rolloverValue: number | null;
  rolloverBehavior: string;
  warningThreshold: number | null;
}

// Internal modal form state — all fields held as strings while editing.
export interface UtilityFormState {
  name: string;
  unit: string;
  readingType: string;
  decimalsAllowed: string;
  rolloverValue: string;
  rolloverBehavior: string;
  warningThreshold: string;
}

export interface UtilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  utility: Utility | null;
  onSave: (data: UtilityFormValues) => void;
}


export enum UnitType {
  M3 = 0,
  Kwh = 1
}

export interface UtilityModel {
  Name: string
  UnitType: number
  CreatedOn: Date
}
