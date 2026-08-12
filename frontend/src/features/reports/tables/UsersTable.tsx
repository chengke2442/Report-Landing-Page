import { Table, type Column } from '../../../components/Table'
import type { User } from '../types'

const columns: Column<User>[] = [
  { header: 'User ID', accessorKey: 'userId' },
  { header: 'Name', accessorKey: 'name' },
  { header: 'Email', accessorKey: 'email' },
  { header: 'Role', accessorKey: 'role' },
  { header: 'Status', accessorKey: 'status' },
  { header: 'Created Date', accessorKey: 'createdDate' },
]

interface UsersTableProps {
  data: User[] | undefined
  isLoading: boolean
  isError: boolean
}

export function UsersTable({ data, isLoading, isError }: UsersTableProps) {
  return <Table columns={columns} data={data} isLoading={isLoading} isError={isError} />
}
