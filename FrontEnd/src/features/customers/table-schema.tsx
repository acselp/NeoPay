import { Checkbox } from '@radix-ui/react-checkbox'
import { Edit, Mail, Phone, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { DataTableColumnHeader } from '@/components/data-table'
import {
  RichTableRowActions,
  type RichTableSchema,
} from '@/components/rich-table'
import { type Customer } from '@/features/customers/data/schema.ts'
import { CustomerService } from '@/services/customer-service'
import type { GetCustomerFilterModel } from '@/lib/types/api-types'

const rowActionsConfig: RichTableSchema<Customer>['rowActions'] = [
  {
    label: 'Edit',
    icon: Edit,
    onClick: (customer) => {
      toast.info(`Edit customer: ${customer.FirstName} ${customer.LastName}`)
    },
  },
  {
    label: 'Send Email',
    icon: Mail,
    onClick: (customer) => {
      toast.info(`Send email to: ${customer.Email || 'No email'}`)
    },
  },
  {
    label: 'Call',
    icon: Phone,
    onClick: (customer) => {
      toast.info(`Call: ${customer.Phone || 'No phone'}`)
    },
  },
  {
    label: 'Delete',
    icon: Trash2,
    variant: 'destructive',
    separator: true,
    onClick: (customer) => {
      toast.error(`Delete customer: ${customer.FirstName} ${customer.LastName}`)
    },
  },
]

export const getSchema = (route: unknown): RichTableSchema<Customer> => {
  return {
    // Backend strategy - fetch data from API
    dataFetcher: async (page: number, pageSize: number, sortField?: string, sortDirection?: 'asc' | 'desc', searchTerm?: string) => {
      const filter: GetCustomerFilterModel = {
        PageIndex: page - 1, // Backend uses 0-indexed pagination
        PageSize: pageSize,
        SortField: sortField,
        SortDirection: sortDirection,
        SearchTerm: searchTerm,
      }

      const response = await CustomerService.getAllPaginated(filter)

      return {
        data: response.Data,
        total: response.Total,
        page: response.PageIndex + 1, // Convert back to 1-indexed for frontend
        pageSize: response.PageSize,
        totalPages: response.TotalPages,
      }
    },

    // Router configuration for URL state
    router: {
      search: route.useSearch(),
      navigate: route.useNavigate(),
    },

    // Column definitions
    columns: [
      // Select column
      {
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label='Select all'
            className='translate-y-[2px]'
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label='Select row'
            className='translate-y-[2px]'
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      // ID column
      {
        accessorKey: 'Id',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='ID' />
        ),
        cell: ({ row }) => (
          <div className='font-medium'>{row.getValue('Id')}</div>
        ),
      },
      // First Name column
      {
        accessorKey: 'FirstName',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='First Name' />
        ),
        cell: ({ row }) => (
          <div className='font-medium'>{row.getValue('FirstName')}</div>
        ),
      },
      // Last Name column
      {
        accessorKey: 'LastName',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Last Name' />
        ),
        cell: ({ row }) => (
          <div className='font-medium'>{row.getValue('LastName')}</div>
        ),
      },
      // Email column
      {
        accessorKey: 'Email',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Email' />
        ),
        cell: ({ row }) => (
          <div className='text-muted-foreground'>
            {row.getValue('Email') || 'N/A'}
          </div>
        ),
      },
      // Phone column
      {
        accessorKey: 'Phone',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Phone' />
        ),
        cell: ({ row }) => (
          <div>{row.getValue('Phone') || 'N/A'}</div>
        ),
      },
      // Account Number column
      {
        accessorKey: 'AccountNr',
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title='Account #' />
        ),
        cell: ({ row }) => (
          <div className='font-mono'>{row.getValue('AccountNr')}</div>
        ),
      },
      // Actions column
      {
        id: 'actions',
        cell: ({ row }) => (
          <RichTableRowActions row={row} actions={rowActionsConfig} />
        ),
      },
    ],

    // Filter configuration
    filters: {
      globalFilter: {
        enabled: true,
        key: 'search',
      },
    },

    // Row actions configuration
    rowActions: rowActionsConfig,

    // Bulk actions configuration
    bulkActions: {
      entityName: 'customer',
      actions: [
        {
          id: 'export',
          label: 'Export selected',
          icon: Mail,
          onClick: (selectedCustomers, table) => {
            toast.success(`Exported ${selectedCustomers.length} customer(s)`)
            table.resetRowSelection()
          },
        },
        {
          id: 'delete',
          label: 'Delete selected',
          icon: Trash2,
          variant: 'destructive',
          onClick: (selectedCustomers, table) => {
            toast.error(`Deleted ${selectedCustomers.length} customer(s)`)
            table.resetRowSelection()
          },
        },
      ],
    },

    // Pagination configuration
    pagination: {
      defaultPage: 1,
      defaultPageSize: 10,
      pageSizeOptions: [10, 20, 30, 40, 50],
    },

    // Toolbar configuration
    toolbar: {
      searchPlaceholder: 'Search customers by name, email, phone, or account number...',
      showViewOptions: true,
      showFilters: true,
    },
  }
}
