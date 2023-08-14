import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../authContext'
import styles from './Header.module.css'
import Logo from './components/Logo/Logo'
import Button from '../../common/Button/Button'
import { STRINGS } from '../../constants'

function Header(): JSX.Element {
  const { loggedIn, logout, username } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const navigateToLogin = () => {
    navigate('login')
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const isLoginPage =
    location.pathname === '/login' || location.pathname === '/registration'

  return (
    <>
      <div className={styles.header}>
        <Logo />
        <div className={styles.userInfo}>
          <span>{username}</span>
        </div>
        {loggedIn ? (
          <Button
            className={styles.logoutButtonStyle}
            onClick={handleLogout}
            text={STRINGS.logoutButtonText}
          />
        ) : (
          !isLoginPage && (
            <Button
              className={styles.loginButtonStyle}
              onClick={navigateToLogin}
              text={'Login'}
            />
          )
        )}
      </div>
    </>
  )
}

export default Header
