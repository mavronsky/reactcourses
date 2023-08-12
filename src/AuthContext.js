import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const login = (username) => {
    setLoggedIn(true);
    setUsername(username);
  };

  const logout = () => {
    setLoggedIn(false);
    setUsername('');
  };

  return (
    <AuthContext.Provider value={{ loggedIn, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
