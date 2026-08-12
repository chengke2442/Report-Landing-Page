import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HttpResponse, http } from 'msw'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { server } from '../../test/server'
import { ReportDetailPage } from './ReportDetailPage'

const mockUsers = [
  {
    userId: 'U001',
    name: 'Alice Johnson',
    email: 'alice.johnson@enfos.com',
    role: 'Admin',
    status: 'Active',
    createdDate: '2024-01-15',
  },
  {
    userId: 'U002',
    name: 'Brian Chen',
    email: 'brian.chen@enfos.com',
    role: 'Editor',
    status: 'Active',
    createdDate: '2024-02-03',
  },
]

function renderDetailPage(reportId = 'users') {
  const queryClient = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[`/reports/${reportId}`]}>
        <Routes>
          <Route path="/" element={<p>Landing page</p>} />
          <Route path="/reports/:reportId" element={<ReportDetailPage />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>,
  )
}

describe('ReportDetailPage (users)', () => {
  it('shows a loading state then renders the table rows', async () => {
    server.use(http.get('/api/reports/users', () => HttpResponse.json(mockUsers)))
    renderDetailPage()

    expect(screen.getByText(/loading/i)).toBeInTheDocument()
    expect(await screen.findByText('Alice Johnson')).toBeInTheDocument()
    expect(screen.getByText('Brian Chen')).toBeInTheDocument()
  })

  it('shows an empty state when there are no rows', async () => {
    server.use(http.get('/api/reports/users', () => HttpResponse.json([])))
    renderDetailPage()

    expect(await screen.findByText(/no rows/i)).toBeInTheDocument()
  })

  it('shows an error state when the fetch fails', async () => {
    server.use(http.get('/api/reports/users', () => new HttpResponse(null, { status: 500 })))
    renderDetailPage()

    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument()
  })

  it('shows an error state for a report id the backend does not recognize', async () => {
    server.use(
      http.get('/api/reports/nonexistent', () =>
        HttpResponse.json({ status: 404, message: 'Unknown report: nonexistent', timestamp: new Date().toISOString() }, { status: 404 }),
      ),
    )
    renderDetailPage('nonexistent')

    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument()
  })

  it('shows a sort indicator on a column header after it is clicked', async () => {
    server.use(http.get('/api/reports/users', () => HttpResponse.json(mockUsers)))
    renderDetailPage()
    await screen.findByText('Alice Johnson')

    const user = userEvent.setup()
    const nameHeader = screen.getByText('Name')
    await user.click(nameHeader)

    expect(nameHeader.closest('th')?.textContent).toMatch(/[▲▼]/)
  })

  it('navigates back to the landing page', async () => {
    server.use(http.get('/api/reports/users', () => HttpResponse.json(mockUsers)))
    renderDetailPage()
    await screen.findByText('Alice Johnson')

    const user = userEvent.setup()
    await user.click(screen.getByText(/back to reports/i))

    expect(await screen.findByText('Landing page')).toBeInTheDocument()
  })
})
