import type { Location, Meter, Utility } from '../types';

export type MeterOption = 'existing' | 'new' | 'none';

export interface ConnectionFormData {
  // Location step
  locationId: string;
  newLocation: boolean;
  locationLabel: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  // Utility step
  utilityId: string;
  // Details step
  startDate: string;
  status: string;
  accountNumber: string;
  // Meter step
  meterOption: MeterOption;
  existingMeterId: string;
  newMeterSerial: string;
  newMeterDigits: string;
  newMeterMultiplier: string;
  newMeterInstallDate: string;
  initialReading: string;
}

export type WizardErrors = Record<string, string | null>;

export type UpdateFormData = (
  field: keyof ConnectionFormData,
  value: string | boolean
) => void;

export interface LocationStepProps {
  formData: ConnectionFormData;
  updateFormData: UpdateFormData;
  existingLocations: Location[];
  errors: WizardErrors;
}

export interface UtilityStepProps {
  formData: ConnectionFormData;
  updateFormData: UpdateFormData;
  errors: WizardErrors;
}

export interface DetailsStepProps {
  formData: ConnectionFormData;
  updateFormData: UpdateFormData;
  errors: WizardErrors;
}

export interface MeterStepProps {
  formData: ConnectionFormData;
  updateFormData: UpdateFormData;
  availableMeters: Meter[];
  selectedUtility?: Utility;
  errors: WizardErrors;
}
