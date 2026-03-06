import { Routes, Route, Link } from 'react-router-dom'
import AirlinesPage from './pages/AirlinesPage'
import './App.css'

function App() {
  return (
    <>
      <h1>Airline Pay Rules Platform</h1>
      <p>Enterprise agreement interpretation engine</p>

      <nav style={{ marginTop: '40px' }}>
        <Link to="/airlines">Airlines</Link>
        <button type="button">Enterprise Agreements</button>
        <button type="button">Rules Engine</button>
        <button type="button">Roster Upload</button>
        <button type="button">Payroll Output</button>
      </nav>

      <main style={{ marginTop: '24px' }}>
        <Routes>
          <Route path="/airlines" element={<AirlinesPage />} />
        </Routes>
      </main>
    </>
  )
}

export default App
