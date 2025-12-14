import { renderTable } from '@/components/rich-table/strategies/table-factory.tsx'
import { type RichTableProps } from '@/components/rich-table/types.ts'

export function RichTable(props: RichTableProps) {
  return <> {renderTable(props)} </>
}
