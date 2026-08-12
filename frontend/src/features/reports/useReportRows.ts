import { useQuery } from '@tanstack/react-query'

async function fetchReportRows<T>(reportId: string): Promise<T[]> {
  const res = await fetch(`/api/reports/${reportId}`)
  if (!res.ok) {
    throw new Error(`Failed to fetch report rows: ${res.status}`)
  }
  return res.json()
}

export function useReportRows<T>(reportId: string) {
  return useQuery({
    queryKey: ['reportRows', reportId],
    queryFn: () => fetchReportRows<T>(reportId),
    enabled: Boolean(reportId),
  })
}
