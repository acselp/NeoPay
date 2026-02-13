import { FileX } from 'lucide-react';
import Button from './Button';

export default function EmptyState({
  icon: Icon = FileX,
  title,
  description,
  action,
  actionLabel,
}) {
  return (
    <div className="text-center py-12">
      <Icon className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>
      {description && (
        <p className="mt-2 text-sm text-gray-500 max-w-sm mx-auto">
          {description}
        </p>
      )}
      {action && actionLabel && (
        <div className="mt-6">
          <Button onClick={action}>{actionLabel}</Button>
        </div>
      )}
    </div>
  );
}
