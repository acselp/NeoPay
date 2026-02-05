import { AdminTableEntities } from '@/services/admin-table-service/types.ts';
import { AdminLayout } from '@/components/layout/admin-layout.tsx';
import { RichTable } from '@/components/rich-table/rich-table.tsx'
import {
  type RichTableProps,
  TableStrategy,
} from '@/components/rich-table/types.ts'
import { GetSchema } from '@/features/customers/list/table-schema.tsx';

export const CustomersList = () => {
  const tableProps: RichTableProps = {
    mode: TableStrategy.Api,
    entity: AdminTableEntities.Customer,
    schema: GetSchema(),
  }

  return (
    <AdminLayout title={"Customer Management"} subtitle={"Here's a list of your customers"}>
      <RichTable {...tableProps} />
    </AdminLayout>
  )
}
