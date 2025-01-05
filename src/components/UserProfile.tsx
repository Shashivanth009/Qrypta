import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import AuthContext from './Auth/AuthContext';

const UserProfile = () => {
  const { user, logout } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState('Not set');
  const [isEditingDisplayName, setIsEditingDisplayName] = useState(false);

  const handleEditDisplayName = () => {
    setIsEditingDisplayName(true);
  };

  const handleSaveDisplayName = () => {
    // Here you would typically make an API call to save the new display name
    setIsEditingDisplayName(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <nav className="fixed w-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center">
              <User className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">Qrypta</span>
            </Link>
            <div className="flex items-center space-x-4">
              {user && <span className="text-gray-700 dark:text-gray-300">Welcome, {user.email}</span>}
              <button onClick={logout} className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center">
            <User className="h-24 w-24 rounded-full mx-auto text-gray-300 dark:text-gray-700 p-2" />
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mt-4">
              {user?.email}
            </h2>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow overflow-hidden rounded-md">
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              <li className="px-4 py-4 sm:px-6">
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Account Information
                  </h3>
                </div>
                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  <p>Email: {user?.email}</p>
                </div>
              </li>
              <li className="px-4 py-4 sm:px-6">
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Display Name
                  </h3>
                  {isEditingDisplayName ? (
                    <div>
                      <input
                        type="text"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="mt-1 p-2 border rounded-md text-black dark:text-white dark:bg-gray-700 focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <button onClick={handleSaveDisplayName} className="ml-2 text-indigo-600 dark:text-indigo-400 hover:underline">
                        Save
                      </button>
                    </div>
                  ) : (
                    <button onClick={handleEditDisplayName} className="text-indigo-600 dark:text-indigo-400 hover:underline">
                      Edit
                    </button>
                  )}
                </div>
                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  <p>{displayName}</p>
                </div>
              </li>
              <li className="px-4 py-4 sm:px-6">
                <div className="flex justify-between">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Settings
                  </h3>
                  <button onClick={() => alert('Settings functionality coming soon!')} className="text-indigo-600 dark:text-indigo-400 hover:underline">
                    Edit
                  </button>
                </div>
                <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  <p>Notifications, Security, etc.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
