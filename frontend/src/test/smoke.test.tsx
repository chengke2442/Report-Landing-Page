import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

describe('test toolchain', () => {
  it('renders a component and asserts on the DOM', () => {
    render(<p>reporting portal test setup works</p>)

    expect(screen.getByText('reporting portal test setup works')).toBeInTheDocument()
  })
})
