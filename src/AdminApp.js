import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './components/Admin/AdminLogin';
import AdminHome from './components/Admin/AdminHome';
import AdminSettings from './components/Admin/AdminSettings';
import AdminProjects from './components/Admin/pages/AdminProjects';
import AdminServices from './components/Admin/pages/AdminServices';
import AdminBlogs from './components/Admin/pages/AdminBlogs';
import AdminTestimonials from './components/Admin/pages/AdminTestimonials';
import AdminContacts from './components/Admin/pages/AdminContacts';
import AdminUsers from './components/Admin/pages/AdminUsers';
import AdminTools from './components/Admin/pages/AdminTools';
import AdminEducation from './components/Admin/pages/AdminEducation';
import AdminExperience from './components/Admin/pages/AdminExperience';
import AdminMarquees from './components/Admin/AdminMarquees';
import AdminFAQ from './components/Admin/pages/AdminFAQ';
import AdminProfile from './components/Admin/AdminProfile';
import './styles/variables.css';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
};

// Admin App Component
function AdminApp() {
  return (
    <div className="AdminApp">
      <Routes>
          {/* Admin Login */}
          <Route path="login" element={<AdminLogin />} />
          
          {/* Protected Admin Routes */}
          <Route path="dashboard" element={
            <ProtectedRoute>
              <AdminHome />
            </ProtectedRoute>
          } />
          
          <Route path="settings" element={
            <ProtectedRoute>
              <AdminSettings />
            </ProtectedRoute>
          } />
          
          {/* All Admin Management Pages */}
          <Route path="projects" element={
            <ProtectedRoute>
              <AdminProjects />
            </ProtectedRoute>
          } />
          
          <Route path="services" element={
            <ProtectedRoute>
              <AdminServices />
            </ProtectedRoute>
          } />
          
          <Route path="blog" element={
            <ProtectedRoute>
              <AdminBlogs />
            </ProtectedRoute>
          } />
          
          <Route path="testimonials" element={
            <ProtectedRoute>
              <AdminTestimonials />
            </ProtectedRoute>
          } />
          
          <Route path="contacts" element={
            <ProtectedRoute>
              <AdminContacts />
            </ProtectedRoute>
          } />
          
          <Route path="users" element={
            <ProtectedRoute>
              <AdminUsers />
            </ProtectedRoute>
          } />
          
          <Route path="tools" element={
            <ProtectedRoute>
              <AdminTools />
            </ProtectedRoute>
          } />
          
          <Route path="education" element={
            <ProtectedRoute>
              <AdminEducation />
            </ProtectedRoute>
          } />
          
          <Route path="experience" element={
            <ProtectedRoute>
              <AdminExperience />
            </ProtectedRoute>
          } />
          
          <Route path="marquees" element={
            <ProtectedRoute>
              <AdminMarquees />
            </ProtectedRoute>
          } />
          
          <Route path="faq" element={
            <ProtectedRoute>
              <AdminFAQ />
            </ProtectedRoute>
          } />
          
          <Route path="profile" element={
            <ProtectedRoute>
              <AdminProfile />
            </ProtectedRoute>
          } />
          
          {/* Default admin redirect */}
          <Route path="" element={<Navigate to="dashboard" replace />} />
          
          {/* 404 for admin routes */}
          <Route path="*" element={
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '100vh',
              textAlign: 'center',
              background: 'var(--brand-light)'
            }}>
              <h1 style={{ fontSize: '3rem', color: 'var(--brand-purple)', marginBottom: '1rem' }}>404</h1>
              <p style={{ fontSize: '1.2rem', color: 'var(--gray-600)', marginBottom: '2rem' }}>Page non trouvée</p>
              <a 
                href="/admin/dashboard" 
                style={{
                  padding: '12px 24px',
                  background: 'var(--brand-purple)',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontWeight: '600'
                }}
              >
                Retour au tableau de bord
              </a>
            </div>
          } />
      </Routes>
    </div>
  );
}

export default AdminApp;