import { Table, type Column } from '../../../components/Table'
import type { Department } from '../types'

const columns: Column<Department>[] = [
  { header: 'Department ID', accessorKey: 'departmentId' },
  { header: 'Department Name', accessorKey: 'name' },
  { header: 'Manager', accessorKey: 'manager' },
  { header: 'Employee Count', accessorKey: 'employeeCount' },
  { header: 'Location', accessorKey: 'location' },
]

interface DepartmentsTableProps {
  data: Department[] | undefined
  isLoading: boolean
  isError: boolean
}

export function DepartmentsTable({ data, isLoading, isError }: DepartmentsTableProps) {
  return <Table columns={columns} data={data} isLoading={isLoading} isError={isError} />
}
