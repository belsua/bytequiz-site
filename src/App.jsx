// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/UI/Navbar'
import MainContent from './components/UI/MainContent'
import Login from './components/Auth/Login'
import ProtectedRoute from './components/ProtectedRoute'
import NotFoundPage from './components/UI/NotFoundPage'
import { AuthProvider } from './contexts/AuthContext'
import ClassroomPage from './pages/teacher/ClassroomPage';
import TeacherDashboard from './pages/teacher/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              {/* General routes */}
              <Route path="/" element={<MainContent />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<NotFoundPage />} />

              {/* Teacher routes */}
              <Route path="/teacher/dashboard" element={<ProtectedRoute><TeacherDashboard /></ProtectedRoute>}/>
              <Route path="/teacher/classroom/:classroomID" element={<ProtectedRoute><ClassroomPage /></ProtectedRoute>} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
