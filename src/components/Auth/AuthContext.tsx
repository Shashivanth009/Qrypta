import React, { createContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email?: string | null;
  password?: string | null;
}

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  loading: false,
  signup: async () => {},
  login: async () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signup = async (email: string, password: string) => {
    const newUser = { id: Math.random().toString(), email, password };
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const login = async (email: string, password: string) => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.email === email && parsedUser.password === password) {
        setUser(parsedUser);
        return;
      }
    }
    throw new Error('Invalid credentials');
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const value: AuthContextProps = {
    user,
    loading,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
