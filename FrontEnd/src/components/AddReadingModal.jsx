import { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle } from 'lucide-react';
import { Modal, Button, Input } from './ui';
import { calculateConsumption } from '../data/mockData';

export default function AddReadingModal({
  isOpen,
  onClose,
  connection,
  meter,
  utility,
  latestReading,
}) {
  const [value, setValue] = useState('');
  const [readingDate, setReadingDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [errors, setErrors] = useState({});
  const [warnings, setWarnings] = useState([]);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setValue('');
      setReadingDate(new Date().toISOString().split('T')[0]);
      setErrors({});
      setWarnings([]);
    }
  }, [isOpen]);

  // Validate and check warnings when value changes
  useEffect(() => {
    if (!value || !latestReading) {
      setWarnings([]);
      return;
    }

    const newValue = parseFloat(value);
    const prevValue = latestReading.value;
    const newWarnings = [];

    // Check for negative consumption (not rollover)
    if (newValue < prevValue) {
      const consumption = calculateConsumption(
        newValue,
        prevValue,
        utility?.rolloverValue
      );
      if (newValue > utility?.rolloverValue * 0.1) {
        // Not likely a rollover
        newWarnings.push({
          type: 'error',
          message: `Reading is lower than previous (${prevValue.toLocaleString()}). Is this a meter rollover?`,
        });
      } else {
        newWarnings.push({
          type: 'warning',
          message: `Possible meter rollover detected. Calculated consumption: ${consumption.toLocaleString()} ${utility?.unit}`,
        });
      }
    }

    // Check for abnormal spike
    if (newValue > prevValue) {
      const consumption = newValue - prevValue;
      const threshold = utility?.warningThreshold || 500;
      if (consumption > threshold * 2) {
        newWarnings.push({
          type: 'warning',
          message: `Unusually high consumption: ${consumption.toLocaleString()} ${utility?.unit}. Please verify.`,
        });
      }
    }

    setWarnings(newWarnings);
  }, [value, latestReading, utility]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!value) {
      newErrors.value = 'Reading value is required';
    }
    if (!readingDate) {
      newErrors.readingDate = 'Date is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // In a real app, this would save to the backend
    console.log('Saving reading:', {
      connectionId: connection.id,
      meterId: meter.id,
      value: parseFloat(value),
      readingDate,
    });

    onClose();
  };

  const consumption =
    value && latestReading
      ? calculateConsumption(
          parseFloat(value),
          latestReading.value,
          utility?.rolloverValue
        )
      : null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Reading" size="md">
      <form onSubmit={handleSubmit}>
        {/* Previous reading info */}
        {latestReading && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-500 mb-1">Last Reading</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">
                {latestReading.value.toLocaleString()}
              </span>
              <span className="text-gray-500">{utility?.unit}</span>
            </div>
            <p className="text-sm text-gray-400 mt-1">
              {new Date(latestReading.readingDate).toLocaleDateString()}
            </p>
          </div>
        )}

        {/* Form fields */}
        <div className="space-y-4">
          <Input
            label={`New Reading (${utility?.unit})`}
            type="number"
            step={utility?.decimalsAllowed > 0 ? `0.${'0'.repeat(utility.decimalsAllowed - 1)}1` : '1'}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              if (errors.value) setErrors({ ...errors, value: null });
            }}
            error={errors.value}
            placeholder={`Enter reading in ${utility?.unit}`}
          />

          <Input
            label="Reading Date"
            type="date"
            value={readingDate}
            onChange={(e) => {
              setReadingDate(e.target.value);
              if (errors.readingDate) setErrors({ ...errors, readingDate: null });
            }}
            error={errors.readingDate}
          />

          {/* Calculated consumption */}
          {consumption !== null && warnings.length === 0 && (
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-green-800">
                  Consumption: {consumption.toLocaleString()} {utility?.unit}
                </p>
                <p className="text-xs text-green-600">
                  From {latestReading.value.toLocaleString()} to {parseFloat(value).toLocaleString()}
                </p>
              </div>
            </div>
          )}

          {/* Warnings */}
          {warnings.map((warning, index) => (
            <div
              key={index}
              className={`flex items-start gap-2 p-3 rounded-lg border ${
                warning.type === 'error'
                  ? 'bg-red-50 border-red-200'
                  : 'bg-yellow-50 border-yellow-200'
              }`}
            >
              <AlertTriangle
                className={`h-5 w-5 flex-shrink-0 ${
                  warning.type === 'error' ? 'text-red-600' : 'text-yellow-600'
                }`}
              />
              <p
                className={`text-sm ${
                  warning.type === 'error' ? 'text-red-800' : 'text-yellow-800'
                }`}
              >
                {warning.message}
              </p>
            </div>
          ))}

          {/* No meter warning */}
          {!meter && (
            <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0" />
              <p className="text-sm text-red-800">
                No meter assigned to this connection. Please assign a meter first.
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
          <Button variant="secondary" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!meter || warnings.some((w) => w.type === 'error')}
          >
            Save Reading
          </Button>
        </div>
      </form>
    </Modal>
  );
}
