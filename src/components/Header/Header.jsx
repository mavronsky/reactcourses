import React from 'react';
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../helpers/authContext';
import styles from './Header.module.css';
import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';
import { logoutButtonStyle, loginButtonStyle } from '../../styles';
import { logoutButtonText } from './../../constants';

function Header() {
  const { loggedIn, username, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navigateToLogin = () => {
    navigate('login');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isLoginPage =
    location.pathname === '/login' || location.pathname === '/registration';

  return (
    <>
      <div className={styles.header}>
        <Logo />
        <div className={styles.userInfo}>
          <span>{username}</span>
        </div>
        {loggedIn ? (
          <Button
            style={logoutButtonStyle}
            onClick={handleLogout}
            text={logoutButtonText}
          />
        ) : (
          !isLoginPage && (
            <Link to="/login">
              <Button
                style={loginButtonStyle}
                onClick={navigateToLogin}
                text={'Login'}
              />
            </Link>
          )
        )}
      </div>
      <Outlet />
    </>
  );
}

export default Header;
