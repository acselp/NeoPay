import type { Unit } from '../unit/types';

export interface UtilityModel {
  Id?: number;
  Name: string;
  UnitId: number;
  Unit?: Unit | null;
}
