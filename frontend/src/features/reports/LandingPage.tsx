import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchReports } from './api'

export function LandingPage() {
  const [search, setSearch] = useState('')
  const { data, isLoading, isError } = useQuery({
    queryKey: ['reports'],
    queryFn: fetchReports,
  })

  const visibleReports = (data ?? []).filter((report) =>
    report.name.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-semibold text-slate-900">Reports</h1>
        <p className="mt-1 text-slate-500">Browse and open any available report.</p>

        <label className="mt-6 block max-w-sm">
          <span className="sr-only">Search reports</span>
          <input
            type="text"
            aria-label="Search reports"
            placeholder="Search reports by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-4 py-2 text-slate-900 focus:border-blue-500 focus:outline-none"
          />
        </label>

        {isLoading && <p className="mt-8 text-slate-500">Loading reports…</p>}
        {isError && (
          <p className="mt-8 text-red-600">Something went wrong loading reports.</p>
        )}

        {!isLoading && !isError && (
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibleReports.map((report) => (
              <Link
                key={report.id}
                to={`/reports/${report.id}`}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-blue-400 hover:shadow-md"
              >
                <h2 className="text-lg font-semibold text-slate-900">{report.name}</h2>
                <p className="mt-1 text-sm text-slate-500">{report.description}</p>
                <p className="mt-3 text-xs text-slate-400">Updated {report.lastUpdated}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
