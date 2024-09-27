// src/App.jsx
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/UI/Navbar'
import MainContent from './components/UI/MainContent'
import Footer from './components/UI/Footer'
import Dashboard from './pages/Dashboard'
import Login from './components/Auth/Login'
import ProtectedRoute from './components/ProtectedRoute'
import NotFoundPage from './components/UI/NotFoundPage'
import { AuthProvider } from './contexts/AuthContext'


function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFoundPage />} /> // Add this route             
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
