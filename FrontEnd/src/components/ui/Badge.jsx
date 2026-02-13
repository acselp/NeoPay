const variants = {
  active: 'bg-green-100 text-green-800',
  pending: 'bg-yellow-100 text-yellow-800',
  disconnected: 'bg-red-100 text-red-800',
  inactive: 'bg-gray-100 text-gray-800',
  available: 'bg-blue-100 text-blue-800',
  default: 'bg-gray-100 text-gray-800',
};

export default function Badge({ children, variant = 'default', className = '' }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${variants[variant] || variants.default} ${className}`}
    >
      {children}
    </span>
  );
}
