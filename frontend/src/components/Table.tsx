import { useEffect, useRef, useState } from 'react'
import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

export type Column<T> = ColumnDef<T, unknown>

interface TableProps<T> {
  columns: Column<T>[]
  data: T[] | undefined
  isLoading: boolean
  isError: boolean
  errorMessage?: string
  emptyMessage?: string
}

export function Table<T>({
  columns,
  data,
  isLoading,
  isError,
  errorMessage = 'Something went wrong loading this report.',
  emptyMessage = 'No rows to show.',
}: TableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const table = useReactTable({
    data: data ?? [],
    columns,
    defaultColumn: { cell: (info) => String(info.getValue()) },
    state: { sorting },
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

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
  }, [data, columns])

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
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="cursor-pointer whitespace-nowrap border-b border-slate-200 px-4 py-2 font-semibold text-slate-700 select-none"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {header.column.getIsSorted() === 'asc' && ' ▲'}
                    {header.column.getIsSorted() === 'desc' && ' ▼'}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b border-slate-100">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="whitespace-nowrap px-4 py-2 text-slate-600">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
