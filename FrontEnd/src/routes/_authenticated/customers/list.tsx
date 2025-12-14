import { createFileRoute } from '@tanstack/react-router'
import { CustomersList } from '@/features/customers/list'

export const Route = createFileRoute('/_authenticated/customers/list')({
  component: CustomersList,
})
