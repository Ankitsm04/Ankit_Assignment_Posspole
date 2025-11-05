import React, { createContext, useState, useEffect } from 'react';
import api from '../api/index';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileExists, setProfileExists] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (token) {
          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const res = await api.get('/profile');
          if (res.data && Object.keys(res.data).length > 0) {
            setUser(res.data.user || res.data);
            setProfileExists(true);
          } else {
            setUser(null);
            setProfileExists(false);
          }
        } else {
          setUser(null);
          setProfileExists(false);
        }
      } catch (error) {
        setUser(null);
        setProfileExists(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
        const loginRes = await api.post('/auth/login', { email, password });
        const token = loginRes.data.token;
        localStorage.setItem('token', token);
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(null);
        setProfileExists(false);
        return { success: true };
    } catch (error) {
        return { success: false, message: error.response?.data?.msg || "Login failed" };
    }
    };


  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user')
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    setProfileExists(false);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, profileExists }}>
      {children}
    </AuthContext.Provider>
  );
};
