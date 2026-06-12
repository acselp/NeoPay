import type { TableCellProps, TableProps, TableRowProps, TableSectionProps } from './types';

export default function Table({ children, className = '' }: TableProps) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ children }: TableSectionProps) {
  return (
    <thead className="bg-gray-50">
      {children}
    </thead>
  );
}

export function TableBody(props: TableSectionProps) {
  return (
    <tbody className="bg-white divide-y divide-gray-200" {...props}>
      {props.children}
    </tbody>
  );
}

export function TableRow({ children, onClick, className = '' }: TableRowProps) {
  return (
    <tr
      onClick={onClick}
      className={`${onClick ? 'cursor-pointer hover:bg-gray-50' : ''} ${className}`}
    >
      {children}
    </tr>
  );
}

export function TableHead({ children, className = '' }: TableCellProps) {
  return (
    <th
      scope="col"
      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className}`}
    >
      {children}
    </th>
  );
}

export function TableCell({ children, colSpan, className = ''}: TableCellProps) {
  return (
    <td className={`px-6 py-4 whitespace-nowrap text-sm ${className}`} colSpan={colSpan}>
      {children}
    </td>
  );
}
