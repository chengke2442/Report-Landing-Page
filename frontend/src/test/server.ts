import { setupServer } from 'msw/node'

// Individual tests add handlers per report endpoint via server.use(...).
export const server = setupServer()
