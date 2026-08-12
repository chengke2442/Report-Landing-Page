# Reporting Portal

An internal reporting portal where users browse a fixed set of available reports (Users, Departments, Projects) and explore each one's data in a table. See [`CONTEXT.md`](CONTEXT.md) for domain terminology.

## Prerequisites

| Tool | Version | Needed for |
|---|---|---|
| Docker + Docker Compose | any recent version | the one-command path |
| Java (JDK) | 21 | running the backend outside Docker |
| Node.js | 22+ | running the frontend outside Docker |

You only need Docker **or** Java+Node, depending on which path below you use.

## Run it: one command (Docker)

```bash
docker compose up --build
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend API: [http://localhost:8080/api](http://localhost:8080/api)

The frontend container serves the built static app via nginx, which proxies any `/api/*` request to the backend container (see `frontend/nginx.conf`) — the browser only ever talks to `localhost:3000`, so there's no CORS configuration to maintain.

## Run it: local dev (no Docker)

From the repo root:

```bash
npm run dev
```

This runs `scripts/dev.mjs`, which starts the Spring Boot backend (`./mvnw spring-boot:run`) and the Vite dev server (`npm run dev` in `frontend/`) together, and shuts both down on Ctrl-C.

- Frontend (Vite, with hot reload): [http://localhost:5173](http://localhost:5173) — Vite's dev server proxies `/api` to `http://localhost:8080` (see `frontend/vite.config.ts`)
- Backend API: [http://localhost:8080/api](http://localhost:8080/api)

To run either half on its own:

```bash
# backend only
cd backend && ./mvnw spring-boot:run

# frontend only (requires the backend running separately for data to load)
cd frontend && npm install && npm run dev
```

### Tests

```bash
# backend
cd backend && ./mvnw test

# frontend
cd frontend && npm test
```

## Screenshots / demo video

_Placeholder — screenshots and a short demo video go here._

## Assumptions and Tradeoffs

**Docker Compose over a plain script.** The assessment asks for a way to run the whole stack with one command. Compose gives that for free with standard, inspectable config (`docker-compose.yml`) instead of a bespoke shell script, at the cost of requiring Docker to be installed. The `npm run dev` path (`scripts/dev.mjs`) covers the no-Docker case.

**A generic registry-based report-row controller over three separate controllers.** `ReportRowController` + `ReportRegistry` serve all three reports (`GET /api/reports/{report}`) through one endpoint keyed by report id, instead of one Spring `@RestController` per report. Adding a fourth report means registering it, not writing a new controller class.

**Frontend-owned column config over backend-driven schema.** Each report's table columns (headers, which fields to show, in what order) are declared in the frontend (`frontend/src/features/reports/tables/*Table.tsx`), not returned by the API. The backend only returns row data. This keeps the API surface small and avoids a schema-description protocol, at the cost of the frontend needing to know each report's shape in advance — acceptable here since the set of reports is fixed, not user-defined.

**MSW over manual frontend mocks.** Frontend tests intercept `fetch` at the network level with Mock Service Worker rather than mocking `fetch` or the API module directly. Tests exercise the real request/response path (including error handling), and the same handlers work in tests and (if ever needed) local browser development.

**Hardcoded in-memory data over an H2/JPA layer.** Report data lives in-memory in each `*Service` class rather than a database. There's no persistence requirement in the assessment, and skipping JPA/H2 removes a layer of setup (schema, migrations, entity mapping) that wouldn't be exercised by anything the reports currently do (no writes, no filtering beyond what's already returned).

**Fixed hardcoded "last updated" dates.** Each report's `lastUpdated` metadata (shown on the Landing Page) is a hardcoded string rather than derived from actual data mutation timestamps, since the underlying data is static and in-memory — there's nothing to compute the timestamp from.
