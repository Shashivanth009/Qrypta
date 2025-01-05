import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import AuthContext from './Auth/AuthContext';
import { useDashboard } from './Dashboard/DashboardContext';

interface AuthContextProps {
  user: { email: string } | null;
  logout: () => void;
}

const DashboardNavbar: React.FC = () => {
  const { user, logout } = useContext(AuthContext) as AuthContextProps;
  const { certificates } = useDashboard();
  const navigate = useNavigate();
  const [isCertificatesOpen, setIsCertificatesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleCertificatesDropdown = () => {
    setIsCertificatesOpen(!isCertificatesOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsCertificatesOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <nav className="bg-gray-900 p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center text-white">
            <Shield className="h-6 w-6 text-indigo-400 mr-2" />
            <span className="text-lg font-bold">Qrypta</span>
          </Link>
          {user && (
            <div>
              <span className="ml-4 text-gray-400">
                Welcome, {user.email}
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleCertificatesDropdown}
              className="text-gray-400 hover:text-white focus:outline-none"
            >
              Certificates ({certificates.length})
            </button>
            {isCertificatesOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-10">
                <Link
                  to="/certificates/history"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  Certificate History
                </Link>
              </div>
            )}
          </div>
          <Link to="/profile" className="text-gray-400 hover:text-white dark:text-gray-300">
            Profile
          </Link>
          <button onClick={logout} className="bg-red-600 text-white rounded-md px-3 py-2 hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
