import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import AdminApp from './AdminApp';
import ErrorBoundary from './ErrorBoundary';

function MainApp() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          {/* Admin routes */}
          <Route path="/admin/*" element={<AdminApp />} />
          
          {/* Public site */}
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default MainApp;