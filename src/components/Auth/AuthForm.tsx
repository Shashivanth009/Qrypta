import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';

const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signup } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await login(email, password);
        navigate('/dashboard');
      } else {
        if (password !== confirmPassword) {
          alert("Passwords do not match");
          return;
        }
        await signup(email, password);
        navigate('/dashboard');
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center">{isLogin ? 'Login' : 'Register'}</h2>
        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Your email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Your password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {!isLogin && (
            <div>
              <label htmlFor="confirm-password" className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                placeholder="Confirm your password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:bg-gray-700 dark:text-white leading-tight focus:outline-none focus:shadow-outline"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={loading}
          >
            {loading ? 'Loading...' : isLogin ? 'Log In' : 'Register'}
          </button>
        </form>
        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400 text-center">
          {isLogin ? (
            <>
              Don't have an account? <button type="button" onClick={toggleAuthMode} className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">Register</button>
            </>
          ) : (
            <>
              Already have an account? <button type="button" onClick={toggleAuthMode} className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">Log In</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
