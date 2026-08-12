// Single-command local dev runner: starts the Spring Boot backend and the
// Vite frontend dev server together, so `npm run dev` at the repo root is
// enough to bring up the whole stack without Docker.
import { spawn } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const isWin = process.platform === 'win32'

const backendDir = path.join(root, 'backend')
const backend = spawn(
  path.join(backendDir, isWin ? 'mvnw.cmd' : 'mvnw'),
  ['spring-boot:run'],
  { cwd: backendDir, stdio: 'inherit', shell: isWin },
)

const frontend = spawn(isWin ? 'npm.cmd' : 'npm', ['run', 'dev'], {
  cwd: path.join(root, 'frontend'),
  stdio: 'inherit',
  shell: isWin,
})

let shuttingDown = false
function shutdown() {
  if (shuttingDown) return
  shuttingDown = true
  backend.kill()
  frontend.kill()
  process.exit()
}

process.on('SIGINT', shutdown)
process.on('SIGTERM', shutdown)
backend.on('exit', (code) => {
  if (!shuttingDown && code !== 0) shutdown()
})
frontend.on('exit', (code) => {
  if (!shuttingDown && code !== 0) shutdown()
})
