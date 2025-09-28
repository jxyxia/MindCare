import React from 'react';
import './styles/global.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import ProtectedRoute from './components/ProtectedRoute';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import Games from './pages/Games';
import Sounds from './pages/Sounds';
import Resources from './pages/Resources';
import Community from './pages/Community';
import Emergency from './pages/Emergency';
import AISupport from './pages/AISupport';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ProfessionalSupportPage from './pages/ProfessionalSupportPage';

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 dark">
      <ErrorBoundary>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={
              <main className="bg-gray-900">
                <Login />
              </main>
            } />
            <Route path="/register" element={
              <main className="bg-gray-900">
                <Register />
              </main>
            } />
            <Route path="/forgot-password" element={
              <main className="bg-gray-900">
                <ForgotPassword />
              </main>
            } />
            
            {/* Protected Routes */}
            <Route path="/*" element={
              <ProtectedRoute>
                <div className="min-h-screen bg-gray-900">
                  <Navigation />
                  <main className="bg-gray-900">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/games" element={<Games />} />
                      <Route path="/sounds" element={<Sounds />} />
                      <Route path="/resources" element={<Resources />} />
                      <Route path="/community" element={<Community />} />
                      <Route path="/professional-support" element={<ProfessionalSupportPage />} />
                      <Route path="/emergency" element={<Emergency />} />
                      <Route path="/support" element={<AISupport />} />
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  </main>
                </div>
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </ErrorBoundary>
    </div>
  );
}

export default App;