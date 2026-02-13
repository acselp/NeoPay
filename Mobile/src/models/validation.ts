import { config } from '../config';
import { Meter, Reading, ValidationResult, ValidationWarning } from './types';

export interface ValidateReadingParams {
  newValue: number;
  meter: Meter;
  lastReading: Reading | null;
  averageConsumption?: number;
}

/**
 * Validates a new meter reading against business rules
 */
export function validateReading(params: ValidateReadingParams): ValidationResult {
  const { newValue, meter, lastReading, averageConsumption } = params;
  const errors: string[] = [];
  const warnings: ValidationWarning[] = [];

  // Rule 1: Value must be numeric and positive
  if (isNaN(newValue)) {
    errors.push('Reading value must be a number');
  } else if (newValue < 0) {
    errors.push('Reading value cannot be negative');
  }

  if (errors.length > 0) {
    return { isValid: false, errors, warnings };
  }

  // Rule 2: Check if lower than last reading
  if (lastReading && newValue < lastReading.value) {
    // Check for potential rollover
    const maxValue = Math.pow(10, meter.digits) - 1;
    const isLikelyRollover = lastReading.value > maxValue * 0.9 && newValue < maxValue * 0.1;

    if (isLikelyRollover) {
      warnings.push({
        type: 'potential_rollover',
        message: `Meter may have rolled over from ${lastReading.value} to ${newValue}. Please confirm this is correct.`,
        requiresConfirmation: true,
        requiresReason: false,
      });
    } else {
      warnings.push({
        type: 'lower_than_last',
        message: `New reading (${newValue}) is lower than last reading (${lastReading.value}). Please provide a reason.`,
        requiresConfirmation: true,
        requiresReason: true,
      });
    }
  }

  // Rule 3: Check for unusually high consumption
  if (lastReading) {
    const consumption = calculateConsumption(newValue, lastReading.value, meter.multiplier, meter.digits);

    // Check against average if available
    if (averageConsumption && averageConsumption > 0) {
      if (consumption > averageConsumption * config.HIGH_CONSUMPTION_MULTIPLIER) {
        warnings.push({
          type: 'unusually_high',
          message: `Consumption (${consumption.toFixed(2)}) is ${(consumption / averageConsumption).toFixed(1)}x higher than average (${averageConsumption.toFixed(2)}). Please confirm.`,
          requiresConfirmation: true,
          requiresReason: false,
        });
      }
    }

    // Check against absolute threshold
    if (consumption > config.HIGH_CONSUMPTION_ABSOLUTE) {
      const existingHighWarning = warnings.find(w => w.type === 'unusually_high');
      if (!existingHighWarning) {
        warnings.push({
          type: 'unusually_high',
          message: `Consumption (${consumption.toFixed(2)}) is unusually high. Please confirm this reading is correct.`,
          requiresConfirmation: true,
          requiresReason: false,
        });
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Calculates consumption between two readings
 * Handles rollover if the new value is lower than the old value
 */
export function calculateConsumption(
  newValue: number,
  lastValue: number,
  multiplier: number,
  digits: number
): number {
  let rawDifference: number;

  if (newValue >= lastValue) {
    rawDifference = newValue - lastValue;
  } else {
    // Handle rollover
    const maxValue = Math.pow(10, digits);
    rawDifference = maxValue - lastValue + newValue;
  }

  return rawDifference * multiplier;
}

/**
 * Formats a meter reading for display
 */
export function formatReading(value: number, digits: number): string {
  return value.toString().padStart(digits, '0');
}

/**
 * Parses a reading input string and validates it's a valid number
 */
export function parseReadingInput(input: string): number | null {
  const trimmed = input.trim();
  if (trimmed === '') return null;

  const parsed = parseFloat(trimmed);
  if (isNaN(parsed)) return null;

  return parsed;
}
