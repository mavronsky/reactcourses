import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
      setLoggedIn(true);
    }
  }, []);

  const login = (username) => {
    setUsername(username);
    setLoggedIn(true);
    localStorage.setItem('username', username); // Сохраните в localStorage
  };

  const logout = () => {
    setUsername('');
    setLoggedIn(false);
    localStorage.removeItem('username'); // Удалите из localStorage
  };

  return (
    <AuthContext.Provider value={{ loggedIn, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
