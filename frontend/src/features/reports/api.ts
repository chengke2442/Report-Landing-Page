import type { Report } from './types'

export async function fetchReports(): Promise<Report[]> {
  const res = await fetch('/api/reports')
  if (!res.ok) {
    throw new Error(`Failed to fetch reports: ${res.status}`)
  }
  return res.json()
}
