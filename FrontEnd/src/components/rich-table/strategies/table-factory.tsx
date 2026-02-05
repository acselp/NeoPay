import { ApiTableStrategy } from '@/components/rich-table/strategies/api-table/api-table.tsx'
import { FrontendTableStrategy } from '@/components/rich-table/strategies/frontend-table/frontend-table-strategy.tsx'
import {
  type RichTableProps,
  TableStrategy,
} from '@/components/rich-table/types.ts'

export const renderTable = (props: RichTableProps) => {
  const { mode } = props
  switch (props.mode) {
    case TableStrategy.Api:
      return <ApiTableStrategy {...props} />

    case TableStrategy.Frontend:
      return <FrontendTableStrategy {...props} />

    default:
      throw new Error(`Unknown strategy: ${mode}`)
  }
}
