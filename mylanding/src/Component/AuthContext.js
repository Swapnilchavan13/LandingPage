// src/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create Context
const AuthContext = createContext();

// Provide Context
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Check localStorage for existing user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (username) => {
    // Simulate login (you can replace this with actual authentication logic)
    const user = { username };
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user)); // Save user to localStorage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // Remove user from localStorage
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook for using context
export const useAuth = () => useContext(AuthContext);
