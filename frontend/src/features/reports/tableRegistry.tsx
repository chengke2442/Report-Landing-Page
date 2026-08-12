import type { ComponentType } from 'react'
import { DepartmentsTable } from './tables/DepartmentsTable'
import { ProjectsTable } from './tables/ProjectsTable'
import { UsersTable } from './tables/UsersTable'

export interface ReportTableProps {
  data: unknown[] | undefined
  isLoading: boolean
  isError: boolean
}

// New report -> add one entry here. ReportDetailPage looks up by reportId
// instead of growing an if/else chain per report, mirroring the backend's
// ReportRegistry.
export const REPORT_TABLES: Record<string, ComponentType<ReportTableProps>> = {
  users: UsersTable as unknown as ComponentType<ReportTableProps>,
  departments: DepartmentsTable as unknown as ComponentType<ReportTableProps>,
  projects: ProjectsTable as unknown as ComponentType<ReportTableProps>,
}
