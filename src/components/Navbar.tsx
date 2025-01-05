import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Shield, Moon, Sun } from 'lucide-react';
import AuthContext from './Auth/AuthContext';

export default function Navbar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className={`w-full dark:bg-gray-900 backdrop-blur-sm z-50`}>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <Shield className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">Qrypta</span>
            {user && <span className="ml-4 text-gray-700 dark:text-gray-300">{user.id}</span>}
          </Link>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {user && (
                <>
                  <Link to="/profile" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium">User Profile</Link>
                  <Link to="/dashboard" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium">Dashboard</Link>
                  <button
                    onClick={() => {
                      logout();
                      navigate('/')
                    }}
                    className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Logout
                  </button>
                </>
              )}
              {!user && (
                <>
                  <Link to="/features" className="text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium">Features</Link>
                  <button
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
                    onClick={() => navigate('/register')}
                  >
                    Get Started
                  </button>
                </>
              )}
              <button
                onClick={() => {}}
                className="p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {false ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className={`${false ? 'bg-gray-800' : 'bg-gray-100'} rounded-md p-2 inline-flex items-center justify-center text-gray-500 hover:text-gray-800 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500`}
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {user ? (
              <>
                <Link to="/profile" className="text-gray-700 dark:text-gray-300 block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800">User Profile</Link>
                <Link to="/dashboard" className="text-gray-700 dark:text-gray-300 block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800">Dashboard</Link>
                <button
                  onClick={() => {
                    logout();
                    navigate('/')
                  }}
                  className="text-gray-700 dark:text-gray-300 block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/features" className="text-gray-700 dark:text-gray-300 block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100 dark:hover:bg-gray-800">Features</Link>
                <Link to="/register" className="bg-indigo-600 text-white block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-700">Get Started</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
