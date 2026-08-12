import { useEffect, useMemo, useRef, useState } from 'react'

export interface Column<T> {
  header: string
  accessorKey: keyof T
}

interface TableProps<T> {
  columns: Column<T>[]
  data: T[] | undefined
  isLoading: boolean
  isError: boolean
  errorMessage?: string
  emptyMessage?: string
}

type SortDirection = 'asc' | 'desc'

export function Table<T>({
  columns,
  data,
  isLoading,
  isError,
  errorMessage = 'Something went wrong loading this report.',
  emptyMessage = 'No rows to show.',
}: TableProps<T>) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const sortedData = useMemo(() => {
    if (!data) return []
    if (!sortKey) return data
    const copy = [...data]
    copy.sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]
      if (aVal === bVal) return 0
      const result = (aVal as string | number) < (bVal as string | number) ? -1 : 1
      return sortDirection === 'asc' ? result : -result
    })
    return copy
  }, [data, sortKey, sortDirection])

  function updateScrollShadows() {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 0)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
  }

  useEffect(() => {
    updateScrollShadows()
    window.addEventListener('resize', updateScrollShadows)
    return () => window.removeEventListener('resize', updateScrollShadows)
  }, [sortedData, columns])

  function handleHeaderClick(key: keyof T) {
    if (sortKey === key) {
      setSortDirection((dir) => (dir === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDirection('asc')
    }
  }

  if (isLoading) {
    return <p className="mt-8 text-slate-500">Loading…</p>
  }

  if (isError) {
    return <p className="mt-8 text-red-600">{errorMessage}</p>
  }

  if (!data || data.length === 0) {
    return <p className="mt-8 text-slate-500">{emptyMessage}</p>
  }

  return (
    <div className="relative mt-6">
      <div ref={scrollRef} onScroll={updateScrollShadows} className="overflow-x-auto">
        <table className="w-full min-w-max border-collapse text-left text-sm">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={String(column.accessorKey)}
                  onClick={() => handleHeaderClick(column.accessorKey)}
                  className="cursor-pointer whitespace-nowrap border-b border-slate-200 px-4 py-2 font-semibold text-slate-700 select-none"
                >
                  {column.header}
                  {sortKey === column.accessorKey ? (sortDirection === 'asc' ? ' ▲' : ' ▼') : ''}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, index) => (
              <tr key={index} className="border-b border-slate-100">
                {columns.map((column) => (
                  <td
                    key={String(column.accessorKey)}
                    className="whitespace-nowrap px-4 py-2 text-slate-600"
                  >
                    {String(row[column.accessorKey])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {canScrollLeft && (
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-slate-400/30 to-transparent" />
      )}
      {canScrollRight && (
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-slate-400/30 to-transparent" />
      )}
    </div>
  )
}
