import { Route, Routes } from 'react-router-dom'
import { LandingPage } from './features/reports/LandingPage'

function ReportDetailPlaceholder() {
  return <p className="p-10 text-slate-500">Report detail view coming in the next ticket.</p>
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/reports/:reportId" element={<ReportDetailPlaceholder />} />
    </Routes>
  )
}

export default App
