import { useFrontendTable } from '@/components/rich-table/strategies/frontend-table/use-frontend-table.ts'
import { TableUi } from '@/components/rich-table/table-ui.tsx'
import { type FrontendStrategyProps } from '@/components/rich-table/types.ts'

export const FrontendTableStrategy = (props: FrontendStrategyProps) => {
  const logic = useFrontendTable(props)
  return <TableUi {...logic} />
}
