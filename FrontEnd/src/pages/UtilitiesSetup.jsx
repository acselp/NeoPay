import { useState } from 'react';
import { Plus, Edit2, Trash2, AlertTriangle, Zap, Droplets, Flame } from 'lucide-react';
import {
  Button,
  Badge,
  Card,
  CardTitle,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Modal,
  Input,
  Select,
  EmptyState,
} from '../components/ui';
import { utilities as initialUtilities, connections } from '../data/mockData';

export default function UtilitiesSetup() {
  const [utilities, setUtilities] = useState(initialUtilities);
  const [showModal, setShowModal] = useState(false);
  const [editingUtility, setEditingUtility] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  const handleEdit = (utility) => {
    setEditingUtility(utility);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingUtility(null);
    setShowModal(true);
  };

  const handleDelete = (utilityId) => {
    // Check if utility has connections
    const hasConnections = connections.some((c) => c.utilityId === utilityId);
    if (hasConnections) {
      alert('Cannot delete utility with existing connections');
      return;
    }
    setUtilities(utilities.filter((u) => u.id !== utilityId));
    setShowDeleteConfirm(null);
  };

  const getUtilityIcon = (name) => {
    switch (name?.toLowerCase()) {
      case 'electricity':
        return <Zap className="h-5 w-5 text-yellow-500" />;
      case 'water':
        return <Droplets className="h-5 w-5 text-blue-500" />;
      case 'gas':
        return <Flame className="h-5 w-5 text-orange-500" />;
      default:
        return <Zap className="h-5 w-5 text-gray-400" />;
    }
  };

  const getConnectionCount = (utilityId) => {
    return connections.filter((c) => c.utilityId === utilityId).length;
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Utilities Setup</h1>
          <p className="text-gray-500 mt-1">
            Configure utility types, units, and reading rules
          </p>
        </div>
        <Button onClick={handleAdd}>
          <Plus className="h-4 w-4 mr-2" />
          Add Utility
        </Button>
      </div>

      {/* Warning banner */}
      <Card className="mb-6 bg-yellow-50 border-yellow-200">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-yellow-800">Admin Configuration</p>
            <p className="text-sm text-yellow-700 mt-1">
              Changes to utility settings affect validation and calculation rules
              for all connections. Proceed with caution.
            </p>
          </div>
        </div>
      </Card>

      {/* Utilities table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {utilities.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Utility</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Reading Type</TableHead>
                <TableHead>Decimals</TableHead>
                <TableHead>Rollover</TableHead>
                <TableHead>Connections</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {utilities.map((utility) => (
                <TableRow key={utility.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      {getUtilityIcon(utility.name)}
                      <div>
                        <div className="font-medium text-gray-900">
                          {utility.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          Created {new Date(utility.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="default">{utility.unit}</Badge>
                  </TableCell>
                  <TableCell className="capitalize">
                    {utility.readingType}
                  </TableCell>
                  <TableCell>{utility.decimalsAllowed}</TableCell>
                  <TableCell>
                    {utility.rolloverValue ? (
                      <div>
                        <div>{utility.rolloverValue.toLocaleString()}</div>
                        <div className="text-xs text-gray-500 capitalize">
                          {utility.rolloverBehavior}
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-400">None</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="font-medium">
                      {getConnectionCount(utility.id)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => handleEdit(utility)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                        title="Edit utility"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setShowDeleteConfirm(utility)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                        title="Delete utility"
                        disabled={getConnectionCount(utility.id) > 0}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <EmptyState
            title="No utilities configured"
            description="Add your first utility type to get started"
            action={handleAdd}
            actionLabel="Add Utility"
          />
        )}
      </div>

      {/* Add/Edit Modal */}
      <UtilityModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          setEditingUtility(null);
        }}
        utility={editingUtility}
        onSave={(data) => {
          if (editingUtility) {
            setUtilities(
              utilities.map((u) =>
                u.id === editingUtility.id ? { ...u, ...data } : u
              )
            );
          } else {
            setUtilities([
              ...utilities,
              {
                ...data,
                id: `util-${Date.now()}`,
                createdAt: new Date().toISOString().split('T')[0],
                updatedBy: 'admin',
              },
            ]);
          }
          setShowModal(false);
          setEditingUtility(null);
        }}
      />

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(null)}
        title="Delete Utility"
        size="sm"
      >
        <p className="text-gray-600">
          Are you sure you want to delete{' '}
          <strong>{showDeleteConfirm?.name}</strong>? This action cannot be
          undone.
        </p>
        {getConnectionCount(showDeleteConfirm?.id) > 0 && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-800">
              This utility has {getConnectionCount(showDeleteConfirm?.id)}{' '}
              active connections and cannot be deleted.
            </p>
          </div>
        )}
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="secondary" onClick={() => setShowDeleteConfirm(null)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => handleDelete(showDeleteConfirm?.id)}
            disabled={getConnectionCount(showDeleteConfirm?.id) > 0}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}

function UtilityModal({ isOpen, onClose, utility, onSave }) {
  const [formData, setFormData] = useState({
    name: utility?.name || '',
    unit: utility?.unit || '',
    readingType: utility?.readingType || 'cumulative',
    decimalsAllowed: utility?.decimalsAllowed?.toString() || '2',
    rolloverValue: utility?.rolloverValue?.toString() || '',
    rolloverBehavior: utility?.rolloverBehavior || 'reset',
    warningThreshold: utility?.warningThreshold?.toString() || '',
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.unit) newErrors.unit = 'Unit is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      name: formData.name,
      unit: formData.unit,
      readingType: formData.readingType,
      decimalsAllowed: parseInt(formData.decimalsAllowed) || 0,
      rolloverValue: formData.rolloverValue
        ? parseInt(formData.rolloverValue)
        : null,
      rolloverBehavior: formData.rolloverBehavior,
      warningThreshold: formData.warningThreshold
        ? parseInt(formData.warningThreshold)
        : null,
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={utility ? 'Edit Utility' : 'Add Utility'}
      size="md"
    >
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <Input
            label="Utility Name"
            placeholder="e.g., Electricity, Water, Gas"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
              if (errors.name) setErrors({ ...errors, name: null });
            }}
            error={errors.name}
          />

          <Input
            label="Unit of Measurement"
            placeholder="e.g., kWh, m³, gallons"
            value={formData.unit}
            onChange={(e) => {
              setFormData({ ...formData, unit: e.target.value });
              if (errors.unit) setErrors({ ...errors, unit: null });
            }}
            error={errors.unit}
          />

          <Select
            label="Reading Type"
            value={formData.readingType}
            onChange={(e) =>
              setFormData({ ...formData, readingType: e.target.value })
            }
            options={[
              { value: 'cumulative', label: 'Cumulative (running total)' },
              { value: 'direct', label: 'Direct (period consumption)' },
            ]}
          />

          <Input
            label="Decimal Places Allowed"
            type="number"
            min="0"
            max="4"
            value={formData.decimalsAllowed}
            onChange={(e) =>
              setFormData({ ...formData, decimalsAllowed: e.target.value })
            }
          />

          <div className="border-t border-gray-200 pt-4">
            <CardTitle className="text-base mb-3">Rollover Settings</CardTitle>
            <p className="text-sm text-gray-500 mb-4">
              Configure how the system handles meter rollover when the maximum
              value is reached.
            </p>

            <Input
              label="Rollover Value (Optional)"
              type="number"
              placeholder="e.g., 99999"
              value={formData.rolloverValue}
              onChange={(e) =>
                setFormData({ ...formData, rolloverValue: e.target.value })
              }
            />

            {formData.rolloverValue && (
              <Select
                label="Rollover Behavior"
                value={formData.rolloverBehavior}
                onChange={(e) =>
                  setFormData({ ...formData, rolloverBehavior: e.target.value })
                }
                options={[
                  { value: 'reset', label: 'Reset to zero' },
                  { value: 'continue', label: 'Continue from overflow' },
                ]}
                className="mt-4"
              />
            )}
          </div>

          <div className="border-t border-gray-200 pt-4">
            <CardTitle className="text-base mb-3">Validation</CardTitle>
            <Input
              label="Warning Threshold (Optional)"
              type="number"
              placeholder="Consumption spike warning threshold"
              value={formData.warningThreshold}
              onChange={(e) =>
                setFormData({ ...formData, warningThreshold: e.target.value })
              }
            />
            <p className="text-xs text-gray-500 mt-1">
              Show a warning when consumption exceeds this value in a single period.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200">
          <Button variant="secondary" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">{utility ? 'Save Changes' : 'Add Utility'}</Button>
        </div>
      </form>
    </Modal>
  );
}
