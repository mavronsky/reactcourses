import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'

interface AuthContextType {
  loggedIn: boolean
  username: string
  login: (username: string) => void
  logout: () => void
  registrationSuccessful: boolean
  setRegistrationSuccessful: React.Dispatch<React.SetStateAction<boolean>>
}

const AuthContext = createContext<AuthContextType>({
  loggedIn: false,
  username: '',
  login: () => {},
  logout: () => {},
  registrationSuccessful: false,
  setRegistrationSuccessful: () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [loggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false)

  useEffect(() => {
    const storedUsername = localStorage.getItem('username')
    if (storedUsername) {
      setUsername(storedUsername)
      setLoggedIn(true)
    }
  }, [])

  const login = (username: string) => {
    setUsername(username)
    setLoggedIn(true)
    localStorage.setItem('username', username)
  }

  const logout = () => {
    setUsername('')
    setLoggedIn(false)
    localStorage.removeItem('username')
  }

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        username,
        login,
        logout,
        registrationSuccessful,
        setRegistrationSuccessful,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
