import {
  validateReading,
  calculateConsumption,
  parseReadingInput,
  formatReading,
  ValidateReadingParams,
} from '../src/models/validation';
import { Meter, Reading } from '../src/models/types';

// Mock meter for testing
const mockMeter: Meter = {
  id: 1,
  serialNumber: 'TEST-001',
  barcodeValue: '1234567890',
  digits: 6,
  multiplier: 1,
  assignedConnectionId: 100,
};

// Mock last reading
const mockLastReading: Reading = {
  id: 1,
  meterId: 1,
  timestamp: '2024-01-15T10:00:00Z',
  value: 10000,
  source: 'mobile',
};

describe('validateReading', () => {
  describe('basic validation', () => {
    it('should return valid for normal reading', () => {
      const params: ValidateReadingParams = {
        newValue: 10500,
        meter: mockMeter,
        lastReading: mockLastReading,
        averageConsumption: 500,
      };

      const result = validateReading(params);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.warnings).toHaveLength(0);
    });

    it('should reject NaN value', () => {
      const params: ValidateReadingParams = {
        newValue: NaN,
        meter: mockMeter,
        lastReading: mockLastReading,
      };

      const result = validateReading(params);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Reading value must be a number');
    });

    it('should reject negative value', () => {
      const params: ValidateReadingParams = {
        newValue: -100,
        meter: mockMeter,
        lastReading: mockLastReading,
      };

      const result = validateReading(params);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Reading value cannot be negative');
    });

    it('should allow zero value', () => {
      const params: ValidateReadingParams = {
        newValue: 0,
        meter: mockMeter,
        lastReading: null,
      };

      const result = validateReading(params);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
  });

  describe('lower than last reading warning', () => {
    it('should warn when new reading is lower than last', () => {
      const params: ValidateReadingParams = {
        newValue: 9500,
        meter: mockMeter,
        lastReading: mockLastReading,
      };

      const result = validateReading(params);

      expect(result.isValid).toBe(true);
      const lowerWarning = result.warnings.find(w => w.type === 'lower_than_last');
      expect(lowerWarning).toBeDefined();
      expect(lowerWarning?.requiresReason).toBe(true);
    });

    it('should detect potential rollover', () => {
      const highMeter: Meter = { ...mockMeter, digits: 5 }; // Max 99999
      const highReading: Reading = { ...mockLastReading, value: 99500 };

      const params: ValidateReadingParams = {
        newValue: 100,
        meter: highMeter,
        lastReading: highReading,
      };

      const result = validateReading(params);

      expect(result.isValid).toBe(true);
      const rolloverWarning = result.warnings.find(w => w.type === 'potential_rollover');
      expect(rolloverWarning).toBeDefined();
      expect(rolloverWarning?.requiresReason).toBe(false);
    });
  });

  describe('unusually high reading warning', () => {
    it('should warn when consumption exceeds 5x average', () => {
      const params: ValidateReadingParams = {
        newValue: 13500, // 3500 consumption, 7x average of 500
        meter: mockMeter,
        lastReading: mockLastReading,
        averageConsumption: 500,
      };

      const result = validateReading(params);

      expect(result.isValid).toBe(true);
      const highWarning = result.warnings.find(w => w.type === 'unusually_high');
      expect(highWarning).toBeDefined();
      expect(highWarning?.requiresConfirmation).toBe(true);
    });

    it('should not warn for normal high reading', () => {
      const params: ValidateReadingParams = {
        newValue: 11000, // 1000 consumption, 2x average
        meter: mockMeter,
        lastReading: mockLastReading,
        averageConsumption: 500,
      };

      const result = validateReading(params);

      expect(result.isValid).toBe(true);
      const highWarning = result.warnings.find(w => w.type === 'unusually_high');
      expect(highWarning).toBeUndefined();
    });
  });

  describe('first reading (no last reading)', () => {
    it('should accept first reading without warnings', () => {
      const params: ValidateReadingParams = {
        newValue: 5000,
        meter: mockMeter,
        lastReading: null,
      };

      const result = validateReading(params);

      expect(result.isValid).toBe(true);
      expect(result.warnings).toHaveLength(0);
    });
  });
});

describe('calculateConsumption', () => {
  it('should calculate simple consumption', () => {
    const consumption = calculateConsumption(10500, 10000, 1, 6);
    expect(consumption).toBe(500);
  });

  it('should apply multiplier', () => {
    const consumption = calculateConsumption(10500, 10000, 10, 6);
    expect(consumption).toBe(5000);
  });

  it('should handle meter rollover', () => {
    // 6 digit meter: max 999999
    // Old: 999900, New: 100
    // Actual: 999900 -> 999999 (99) + 0 -> 100 (100) = 200
    const consumption = calculateConsumption(100, 999900, 1, 6);
    expect(consumption).toBe(200);
  });

  it('should handle rollover with multiplier', () => {
    // 5 digit meter: max 99999
    // Old: 99900, New: 50
    // Actual: 99900 -> 99999 (99) + 0 -> 50 (50) = 150
    const consumption = calculateConsumption(50, 99900, 10, 5);
    expect(consumption).toBe(1500); // 150 * 10
  });
});

describe('parseReadingInput', () => {
  it('should parse valid integer', () => {
    expect(parseReadingInput('12345')).toBe(12345);
  });

  it('should parse valid decimal', () => {
    expect(parseReadingInput('123.45')).toBe(123.45);
  });

  it('should handle leading/trailing whitespace', () => {
    expect(parseReadingInput('  12345  ')).toBe(12345);
  });

  it('should return null for empty string', () => {
    expect(parseReadingInput('')).toBeNull();
  });

  it('should return null for whitespace only', () => {
    expect(parseReadingInput('   ')).toBeNull();
  });

  it('should return null for invalid input', () => {
    expect(parseReadingInput('abc')).toBeNull();
  });

  it('should return null for mixed input', () => {
    expect(parseReadingInput('123abc')).toBeNull();
  });
});

describe('formatReading', () => {
  it('should pad with zeros for 6 digit meter', () => {
    expect(formatReading(123, 6)).toBe('000123');
  });

  it('should not truncate larger values', () => {
    expect(formatReading(1234567, 6)).toBe('1234567');
  });

  it('should handle zero', () => {
    expect(formatReading(0, 5)).toBe('00000');
  });
});
