# Reporting Portal

An internal reporting portal where users browse a fixed set of available reports and explore each one's data in a table.

## Language

**Report**:
One of the three fixed datasets exposed by the portal — Users, Departments, or Projects. Identified by a stable slug (`users`, `departments`, `projects`) used both as its metadata `id` and as its API path segment.
_Avoid_: Dataset, table (that's the view, not the data), dashboard

**Report Metadata**:
The descriptive info about a Report shown on the Landing Page before it's opened — name, short description, last-updated timestamp. Returned by `GET /api/reports`.
_Avoid_: Report summary, report card data

**Report Row**:
A single record within a Report's data (e.g. one user, one department, one project). Returned by the per-report endpoints (`GET /api/reports/{report}`).
_Avoid_: Record, entry, item

**Landing Page**:
The homepage where users browse all available Reports and search/filter them by name before opening one.
_Avoid_: Home, dashboard, index

**Report Detail View**:
The dedicated table view for a single Report, reached by opening it from the Landing Page. Renders that Report's rows and handles loading/empty/error states.
_Avoid_: Report page, table page
