import { useApiTable } from '@/components/rich-table/strategies/api-table/use-api-table.ts'
import { TableUi } from '@/components/rich-table/table-ui.tsx'
import { type ApiTableStrategyProps } from '@/components/rich-table/types.ts'

export const ApiTableStrategy = (props: ApiTableStrategyProps) => {
  const logic = useApiTable(props)
  return <TableUi {...logic} />
}
