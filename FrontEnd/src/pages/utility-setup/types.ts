import type { Unit } from '../unit/types';
import {BillingType} from "./create-update/types";

export interface Utility {
  Id?: number;
  Name: string;
  UnitId: number;
  Unit?: Unit | null;
  BillingType: BillingType;
}
