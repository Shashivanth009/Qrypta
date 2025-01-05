import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';
import CertificateList from './components/Certificate/CertificateList';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks/HowItWorks';
import Dashboard from './components/Dashboard/Dashboard';
import CertificateUpload from './components/Certificate/CertificateUpload';
import CertificateDetails from './components/Certificate/CertificateDetails';
import CertificateVerification from './components/Certificate/CertificateVerification';
import AuthForm from './components/Auth/AuthForm';
import AuthContext from './components/Auth/AuthContext';
import CertificateAnalysis from './components/CertificateAnalysis';
import UserProfile from './components/UserProfile';
import CertificateUploadHistory from './components/Certificate/CertificateUploadHistory';
import { AuthProvider } from './components/Auth/AuthContext';
import DashboardProvider from './components/Dashboard/DashboardContext';

function App() {
  const { user } = useContext(AuthContext);
  const handleUploadSuccess = () => {
    console.log('Certificate uploaded successfully!');
  };

  return (
    <AuthProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AppContent onUploadSuccess={handleUploadSuccess} />
      </Router>
    </AuthProvider>
  );
}

function AppContent({ onUploadSuccess }: { onUploadSuccess: () => void }) {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const isMainMenu = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-900 dark:bg-gray-800">
      <div className={user ? "" : "pt-16"}>
        <Routes>
          <Route path="/" element={
            <>
              {isMainMenu && <Navbar />}
              <Hero />
              <Features />
              <HowItWorks />
            </>
          } />
          <Route path="/features" element={<><Features /></>} />
          <Route path="/login" element={<><AuthForm /></>} />
          <Route path="/register" element={<><AuthForm /></>} />
          <Route path="/profile" element={<><UserProfile /></>} />
          <Route path="/certificates" element={<><CertificateList /></>} />
          <Route path="/certificate/upload" element={<><CertificateUpload onUploadSuccess={onUploadSuccess} /></>} />
          <Route path="/certificate/verify" element={<><CertificateVerification /></>} />
          <Route path="/dashboard" element={
            <DashboardProvider>
              <Dashboard />
            </DashboardProvider>
          } />
          <Route path="/certificates/history" element={<><CertificateUploadHistory /></>} />
          <Route path="/certificates/:id" element={<><CertificateDetails /></>} />
          <Route path="/certificates/edit/:id" element={<><div>Edit Certificate</div></>} />
          <Route path="/certificate-analysis" element={<><CertificateAnalysis /></>} />
          <Route path="/verify/:id" element={<><CertificateVerification /></>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
