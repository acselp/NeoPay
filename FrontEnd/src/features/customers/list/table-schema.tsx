import { DataTableColumnHeader } from '@/components/data-table'
import { type RichTableSchema } from '@/components/rich-table/types.ts'

export const GetSchema = (): RichTableSchema => {
  return {
    columns: [
      {
        accessorKey: 'id',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Id' />
        ),
        cell: ({ row }) => <div className='w-[80px]'>{row.getValue('id')}</div>,
      },
      {
        accessorKey: 'firstName',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='First Name' />
        ),
        meta: { className: 'ps-1', tdClassName: 'ps-4' },
        cell: ({ row }) => (
          <div className='w-[80px]'>{row.getValue('firstName')}</div>
        ),
      },
      {
        accessorKey: 'lastName',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Last Name' />
        ),
        meta: { className: 'ps-1', tdClassName: 'ps-4' },
        cell: ({ row }) => (
          <div className='w-[80px]'>{row.getValue('lastName')}</div>
        ),
      },
      {
        accessorKey: 'email',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Email' />
        ),
        meta: { className: 'ps-1', tdClassName: 'ps-4' },
        cell: ({ row }) => (
          <div className='w-[80px]'>{row.getValue('email')}</div>
        ),
      },
      {
        accessorKey: 'phone',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Phone' />
        ),
        meta: { className: 'ps-1', tdClassName: 'ps-4' },
        cell: ({ row }) => (
          <div className='w-[80px]'>{row.getValue('phone')}</div>
        ),
      },
      {
        accessorKey: 'accountNr',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Account Nr' />
        ),
        meta: { className: 'ps-1', tdClassName: 'ps-4' },
        cell: ({ row }) => (
          <div className='w-[80px]'>{row.getValue('accountNr')}</div>
        ),
      },
    ],
  }
}
