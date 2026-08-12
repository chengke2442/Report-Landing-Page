import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HttpResponse, http } from 'msw'
import { describe, expect, it } from 'vitest'
import { server } from '../../test/server'
import { renderWithProviders } from '../../test/renderWithProviders'
import { LandingPage } from './LandingPage'

const mockReports = [
  { id: 'users', name: 'Users', description: 'People in the system', lastUpdated: '2026-08-10' },
  { id: 'departments', name: 'Departments', description: 'Org structure', lastUpdated: '2026-08-09' },
  { id: 'projects', name: 'Projects', description: 'Active & past work', lastUpdated: '2026-08-08' },
]

describe('LandingPage', () => {
  it('renders a card for each fetched report', async () => {
    server.use(
      http.get('/api/reports', () => HttpResponse.json(mockReports)),
    )

    renderWithProviders(<LandingPage />)

    expect(await screen.findByText('Users')).toBeInTheDocument()
    expect(screen.getByText('Departments')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('People in the system')).toBeInTheDocument()
  })

  it('shows a loading state before the reports arrive', async () => {
    server.use(
      http.get('/api/reports', () => HttpResponse.json(mockReports)),
    )

    renderWithProviders(<LandingPage />)

    expect(screen.getByText(/loading/i)).toBeInTheDocument()
    await waitFor(() => expect(screen.queryByText(/loading/i)).not.toBeInTheDocument())
  })

  it('shows an error state when the fetch fails', async () => {
    server.use(
      http.get('/api/reports', () => new HttpResponse(null, { status: 500 })),
    )

    renderWithProviders(<LandingPage />)

    expect(await screen.findByText(/something went wrong/i)).toBeInTheDocument()
  })

  it('filters visible cards by name as the user types', async () => {
    server.use(
      http.get('/api/reports', () => HttpResponse.json(mockReports)),
    )

    renderWithProviders(<LandingPage />)
    await screen.findByText('Users')

    const user = userEvent.setup()
    await user.type(screen.getByRole('textbox', { name: /search/i }), 'dep')

    expect(screen.getByText('Departments')).toBeInTheDocument()
    expect(screen.queryByText('Users')).not.toBeInTheDocument()
    expect(screen.queryByText('Projects')).not.toBeInTheDocument()
  })
})
