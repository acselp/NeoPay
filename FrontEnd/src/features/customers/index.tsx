import { AdminTableEntities } from '@/services/admin-table-service/types.ts'
import { AdminLayout } from '@/components/layout/admin-layout.tsx'
import { RichTable } from '@/components/rich-table/rich-table.tsx'
import {
  type RichTableProps,
  TableStrategy,
} from '@/components/rich-table/types.ts'
import { GetSchema } from '@/features/customers/table-schema.tsx'

export const Customers = () => {
  const tableProps: RichTableProps = {
    mode: TableStrategy.Api,
    entity: AdminTableEntities.Customer,
    schema: GetSchema(),
  }

  return (
    <AdminLayout>
      <RichTable {...tableProps} />
    </AdminLayout>
  )
}
