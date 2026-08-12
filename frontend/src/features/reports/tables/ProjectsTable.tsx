import { Table, type Column } from '../../../components/Table'
import type { Project } from '../types'

const columns: Column<Project>[] = [
  { header: 'Project ID', accessorKey: 'projectId' },
  { header: 'Project Name', accessorKey: 'name' },
  { header: 'Department', accessorKey: 'department' },
  { header: 'Owner', accessorKey: 'owner' },
  { header: 'Status', accessorKey: 'status' },
  { header: 'Start Date', accessorKey: 'startDate' },
  { header: 'End Date', accessorKey: 'endDate' },
]

interface ProjectsTableProps {
  data: Project[] | undefined
  isLoading: boolean
  isError: boolean
}

export function ProjectsTable({ data, isLoading, isError }: ProjectsTableProps) {
  return <Table columns={columns} data={data} isLoading={isLoading} isError={isError} />
}
