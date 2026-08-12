import { Link, useParams } from 'react-router-dom'
import { UsersTable } from './tables/UsersTable'
import type { User } from './types'
import { useReportRows } from './useReportRows'

const REPORT_TITLES: Record<string, string> = {
  users: 'Users',
  departments: 'Departments',
  projects: 'Projects',
}

export function ReportDetailPage() {
  const { reportId = '' } = useParams<{ reportId: string }>()
  const { data, isLoading, isError } = useReportRows<User>(reportId)

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <Link to="/" className="text-sm text-blue-600 hover:underline">
          ← Back to reports
        </Link>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900">
          {REPORT_TITLES[reportId] ?? reportId}
        </h1>

        {reportId === 'users' && (
          <UsersTable data={data} isLoading={isLoading} isError={isError} />
        )}
      </div>
    </div>
  )
}
