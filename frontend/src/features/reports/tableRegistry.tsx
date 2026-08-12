import type { ComponentType } from 'react'
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
}
