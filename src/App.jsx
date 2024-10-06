// src/App.jsx
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/UI/Navbar'
import MainContent from './components/UI/MainContent'
import Dashboard from './pages/Dashboard'
import Login from './components/Auth/Login'
import ProtectedRoute from './components/ProtectedRoute'
import NotFoundPage from './components/UI/NotFoundPage'
import { AuthProvider } from './contexts/AuthContext'
import ClassroomPage from './pages/ClassroomPage';


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
              <Route path="/classroom/:classroomID" element={<ClassroomPage />} />
              <Route path="*" element={<NotFoundPage />} /> // Add this route             
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
