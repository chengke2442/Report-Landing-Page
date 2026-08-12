import { Route, Routes } from 'react-router-dom'
import { LandingPage } from './features/reports/LandingPage'
import { ReportDetailPage } from './features/reports/ReportDetailPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/reports/:reportId" element={<ReportDetailPage />} />
    </Routes>
  )
}

export default App
