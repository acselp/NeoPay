import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Check, ChevronLeft, ChevronRight, MapPin, Zap, FileText, Gauge, Plus } from 'lucide-react';
import { Button, Input, Select, Breadcrumbs, Card } from '../components/ui';
import {
  getCustomer,
  getCustomerLocations,
  utilities,
  getAvailableMeters,
} from '../data/mockData';

const steps = [
  { id: 'location', name: 'Location', icon: MapPin },
  { id: 'utility', name: 'Utility', icon: Zap },
  { id: 'details', name: 'Details', icon: FileText },
  { id: 'meter', name: 'Meter', icon: Gauge },
];

export default function AddConnectionWizard() {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const customer = getCustomer(customerId);
  const existingLocations = getCustomerLocations(customerId);
  const availableMeters = getAvailableMeters();

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Location step
    locationId: '',
    newLocation: false,
    locationLabel: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    // Utility step
    utilityId: '',
    // Details step
    startDate: new Date().toISOString().split('T')[0],
    status: 'active',
    accountNumber: '',
    // Meter step
    meterOption: 'existing', // 'existing', 'new', 'none'
    existingMeterId: '',
    newMeterSerial: '',
    newMeterDigits: '5',
    newMeterMultiplier: '1',
    newMeterInstallDate: new Date().toISOString().split('T')[0],
    initialReading: '',
  });

  const [errors, setErrors] = useState({});

  if (!customer) {
    return (
      <div className="p-8">
        <p>Customer not found.</p>
        <Button onClick={() => navigate('/customers')}>Back to Customers</Button>
      </div>
    );
  }

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateStep = () => {
    const newErrors = {};

    if (currentStep === 0) {
      if (!formData.newLocation && !formData.locationId) {
        newErrors.locationId = 'Please select a location or add a new one';
      }
      if (formData.newLocation) {
        if (!formData.locationLabel) newErrors.locationLabel = 'Label is required';
        if (!formData.address) newErrors.address = 'Address is required';
        if (!formData.city) newErrors.city = 'City is required';
      }
    }

    if (currentStep === 1) {
      if (!formData.utilityId) {
        newErrors.utilityId = 'Please select a utility';
      }
    }

    if (currentStep === 2) {
      if (!formData.startDate) {
        newErrors.startDate = 'Start date is required';
      }
    }

    if (currentStep === 3) {
      if (formData.meterOption === 'existing' && !formData.existingMeterId) {
        newErrors.existingMeterId = 'Please select a meter';
      }
      if (formData.meterOption === 'new') {
        if (!formData.newMeterSerial) newErrors.newMeterSerial = 'Serial number is required';
        if (!formData.newMeterDigits) newErrors.newMeterDigits = 'Number of digits is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // In a real app, this would save to the backend
    console.log('Creating connection with data:', formData);

    // Navigate to the customer detail page
    // In a real app, you'd navigate to the new connection detail
    navigate(`/customers/${customerId}`, {
      state: { message: 'Connection created successfully' },
    });
  };

  const selectedUtility = utilities.find(u => u.id === formData.utilityId);

  return (
    <div className="p-8 max-w-3xl mx-auto">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Customers', href: '/customers' },
          { label: customer.name, href: `/customers/${customerId}` },
          { label: 'Add Connection' },
        ]}
      />

      {/* Header */}
      <div className="mt-4 mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Add Connection</h1>
        <p className="text-gray-500 mt-1">
          Set up a new utility connection for {customer.name}
        </p>
      </div>

      {/* Stepper */}
      <div className="mb-8">
        <nav aria-label="Progress">
          <ol className="flex items-center">
            {steps.map((step, index) => (
              <li
                key={step.id}
                className={`relative ${index !== steps.length - 1 ? 'pr-8 sm:pr-20 flex-1' : ''}`}
              >
                <div className="flex items-center">
                  <div
                    className={`relative flex h-10 w-10 items-center justify-center rounded-full ${
                      index < currentStep
                        ? 'bg-blue-600'
                        : index === currentStep
                        ? 'border-2 border-blue-600 bg-white'
                        : 'border-2 border-gray-300 bg-white'
                    }`}
                  >
                    {index < currentStep ? (
                      <Check className="h-5 w-5 text-white" />
                    ) : (
                      <step.icon
                        className={`h-5 w-5 ${
                          index === currentStep ? 'text-blue-600' : 'text-gray-400'
                        }`}
                      />
                    )}
                  </div>
                  <span
                    className={`ml-3 text-sm font-medium ${
                      index <= currentStep ? 'text-gray-900' : 'text-gray-500'
                    }`}
                  >
                    {step.name}
                  </span>
                </div>
                {index !== steps.length - 1 && (
                  <div
                    className={`absolute top-5 left-10 -ml-px mt-0.5 h-0.5 w-full ${
                      index < currentStep ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                    style={{ width: 'calc(100% - 2.5rem)' }}
                  />
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {/* Step Content */}
      <Card className="mb-6">
        {currentStep === 0 && (
          <LocationStep
            formData={formData}
            updateFormData={updateFormData}
            existingLocations={existingLocations}
            errors={errors}
          />
        )}
        {currentStep === 1 && (
          <UtilityStep
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        )}
        {currentStep === 2 && (
          <DetailsStep
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        )}
        {currentStep === 3 && (
          <MeterStep
            formData={formData}
            updateFormData={updateFormData}
            availableMeters={availableMeters}
            selectedUtility={selectedUtility}
            errors={errors}
          />
        )}
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="secondary"
          onClick={handleBack}
          disabled={currentStep === 0}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={() => navigate(`/customers/${customerId}`)}>
            Cancel
          </Button>
          <Button onClick={handleNext}>
            {currentStep === steps.length - 1 ? (
              'Create Connection'
            ) : (
              <>
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

function LocationStep({ formData, updateFormData, existingLocations, errors }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Select Location</h2>
        <p className="text-sm text-gray-500">
          Choose an existing location or add a new one for this connection.
        </p>
      </div>

      {existingLocations.length > 0 && !formData.newLocation && (
        <div className="space-y-3">
          {existingLocations.map((location) => (
            <label
              key={location.id}
              className={`flex items-start p-4 border rounded-lg cursor-pointer transition-colors ${
                formData.locationId === location.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="locationId"
                value={location.id}
                checked={formData.locationId === location.id}
                onChange={(e) => updateFormData('locationId', e.target.value)}
                className="mt-1 h-4 w-4 text-blue-600"
              />
              <div className="ml-3">
                <div className="font-medium text-gray-900">{location.label}</div>
                <div className="text-sm text-gray-500">
                  {location.address}, {location.city}, {location.state} {location.zipCode}
                </div>
              </div>
            </label>
          ))}
          {errors.locationId && (
            <p className="text-sm text-red-600">{errors.locationId}</p>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={() => {
          updateFormData('newLocation', !formData.newLocation);
          updateFormData('locationId', '');
        }}
        className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
      >
        <Plus className="h-4 w-4 mr-1" />
        {formData.newLocation ? 'Select existing location' : 'Add new location'}
      </button>

      {formData.newLocation && (
        <div className="space-y-4 pt-4 border-t border-gray-200">
          <Input
            label="Location Label"
            placeholder="e.g., Main Residence, Office Building"
            value={formData.locationLabel}
            onChange={(e) => updateFormData('locationLabel', e.target.value)}
            error={errors.locationLabel}
          />
          <Input
            label="Street Address"
            placeholder="123 Main Street"
            value={formData.address}
            onChange={(e) => updateFormData('address', e.target.value)}
            error={errors.address}
          />
          <div className="grid grid-cols-3 gap-4">
            <Input
              label="City"
              value={formData.city}
              onChange={(e) => updateFormData('city', e.target.value)}
              error={errors.city}
            />
            <Input
              label="State"
              value={formData.state}
              onChange={(e) => updateFormData('state', e.target.value)}
            />
            <Input
              label="ZIP Code"
              value={formData.zipCode}
              onChange={(e) => updateFormData('zipCode', e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function UtilityStep({ formData, updateFormData, errors }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Select Utility</h2>
        <p className="text-sm text-gray-500">
          Choose which utility service to connect at this location.
        </p>
      </div>

      <div className="space-y-3">
        {utilities.map((utility) => (
          <label
            key={utility.id}
            className={`flex items-start p-4 border rounded-lg cursor-pointer transition-colors ${
              formData.utilityId === utility.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <input
              type="radio"
              name="utilityId"
              value={utility.id}
              checked={formData.utilityId === utility.id}
              onChange={(e) => updateFormData('utilityId', e.target.value)}
              className="mt-1 h-4 w-4 text-blue-600"
            />
            <div className="ml-3 flex-1">
              <div className="flex items-center justify-between">
                <div className="font-medium text-gray-900">{utility.name}</div>
                <div className="text-sm text-gray-500">Unit: {utility.unit}</div>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {utility.readingType === 'cumulative' ? 'Cumulative readings' : 'Direct readings'}
                {utility.decimalsAllowed > 0 && ` • Up to ${utility.decimalsAllowed} decimal places`}
              </div>
              {utility.rolloverValue && (
                <div className="text-xs text-gray-400 mt-1">
                  Meter rollover at {utility.rolloverValue.toLocaleString()}
                </div>
              )}
            </div>
          </label>
        ))}
        {errors.utilityId && (
          <p className="text-sm text-red-600">{errors.utilityId}</p>
        )}
      </div>
    </div>
  );
}

function DetailsStep({ formData, updateFormData, errors }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Connection Details</h2>
        <p className="text-sm text-gray-500">
          Configure the connection settings and identifiers.
        </p>
      </div>

      <div className="space-y-4">
        <Input
          label="Start Date"
          type="date"
          value={formData.startDate}
          onChange={(e) => updateFormData('startDate', e.target.value)}
          error={errors.startDate}
        />

        <Select
          label="Status"
          value={formData.status}
          onChange={(e) => updateFormData('status', e.target.value)}
          options={[
            { value: 'pending', label: 'Pending' },
            { value: 'active', label: 'Active' },
          ]}
        />

        <Input
          label="Account Number (Optional)"
          placeholder="e.g., ELEC-2024-001"
          value={formData.accountNumber}
          onChange={(e) => updateFormData('accountNumber', e.target.value)}
        />

        <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
          <strong>Note:</strong> If no account number is provided, one will be automatically generated.
        </div>
      </div>
    </div>
  );
}

function MeterStep({ formData, updateFormData, availableMeters, selectedUtility, errors }) {
  const filteredMeters = availableMeters.filter(m => {
    // Filter meters that match the utility type (basic logic based on serial prefix)
    if (selectedUtility?.name === 'Electricity') return m.serialNumber.startsWith('EM');
    if (selectedUtility?.name === 'Water') return m.serialNumber.startsWith('WM');
    if (selectedUtility?.name === 'Gas') return m.serialNumber.startsWith('GM');
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Meter Assignment</h2>
        <p className="text-sm text-gray-500">
          Assign a meter to this connection or skip to add one later.
        </p>
      </div>

      {/* Meter option selection */}
      <div className="space-y-3">
        <label
          className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
            formData.meterOption === 'existing'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <input
            type="radio"
            name="meterOption"
            value="existing"
            checked={formData.meterOption === 'existing'}
            onChange={(e) => updateFormData('meterOption', e.target.value)}
            className="h-4 w-4 text-blue-600"
          />
          <span className="ml-3 font-medium text-gray-900">Assign existing meter</span>
        </label>

        <label
          className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
            formData.meterOption === 'new'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <input
            type="radio"
            name="meterOption"
            value="new"
            checked={formData.meterOption === 'new'}
            onChange={(e) => updateFormData('meterOption', e.target.value)}
            className="h-4 w-4 text-blue-600"
          />
          <span className="ml-3 font-medium text-gray-900">Create new meter</span>
        </label>

        <label
          className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
            formData.meterOption === 'none'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <input
            type="radio"
            name="meterOption"
            value="none"
            checked={formData.meterOption === 'none'}
            onChange={(e) => updateFormData('meterOption', e.target.value)}
            className="h-4 w-4 text-blue-600"
          />
          <span className="ml-3 font-medium text-gray-900">Skip for now</span>
        </label>
      </div>

      {/* Existing meter selection */}
      {formData.meterOption === 'existing' && (
        <div className="space-y-4 pt-4 border-t border-gray-200">
          {filteredMeters.length > 0 ? (
            <>
              <Select
                label="Select Meter"
                value={formData.existingMeterId}
                onChange={(e) => updateFormData('existingMeterId', e.target.value)}
                placeholder="Choose a meter..."
                options={filteredMeters.map(m => ({
                  value: m.id,
                  label: `${m.serialNumber} - ${m.manufacturer} ${m.model}`,
                }))}
                error={errors.existingMeterId}
              />
              {formData.existingMeterId && (
                <div className="bg-gray-50 rounded-lg p-4">
                  {(() => {
                    const meter = filteredMeters.find(m => m.id === formData.existingMeterId);
                    return meter ? (
                      <div className="text-sm">
                        <p><strong>Serial:</strong> {meter.serialNumber}</p>
                        <p><strong>Model:</strong> {meter.manufacturer} {meter.model}</p>
                        <p><strong>Digits:</strong> {meter.digits}</p>
                        <p><strong>Multiplier:</strong> {meter.multiplier}x</p>
                      </div>
                    ) : null;
                  })()}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-4 text-gray-500">
              No available meters for {selectedUtility?.name}. Create a new meter instead.
            </div>
          )}
        </div>
      )}

      {/* New meter form */}
      {formData.meterOption === 'new' && (
        <div className="space-y-4 pt-4 border-t border-gray-200">
          <Input
            label="Serial Number"
            placeholder="e.g., EM-2024-00500"
            value={formData.newMeterSerial}
            onChange={(e) => updateFormData('newMeterSerial', e.target.value)}
            error={errors.newMeterSerial}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Install Date"
              type="date"
              value={formData.newMeterInstallDate}
              onChange={(e) => updateFormData('newMeterInstallDate', e.target.value)}
            />
            <Input
              label="Number of Digits"
              type="number"
              min="4"
              max="8"
              value={formData.newMeterDigits}
              onChange={(e) => updateFormData('newMeterDigits', e.target.value)}
              error={errors.newMeterDigits}
            />
          </div>
          <Input
            label="Multiplier"
            type="number"
            min="1"
            value={formData.newMeterMultiplier}
            onChange={(e) => updateFormData('newMeterMultiplier', e.target.value)}
          />
          <Input
            label="Initial Reading (Optional)"
            type="number"
            placeholder="0"
            value={formData.initialReading}
            onChange={(e) => updateFormData('initialReading', e.target.value)}
          />
        </div>
      )}

      {formData.meterOption === 'none' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-sm text-yellow-800">
          <strong>Note:</strong> You can assign a meter later from the connection detail page.
          Readings cannot be recorded until a meter is assigned.
        </div>
      )}
    </div>
  );
}
