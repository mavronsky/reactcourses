import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../helpers/authContext';
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import styles from './Login.module.css';
import styled from 'styled-components';

const LoginInputStyle = styled(Input)`
  display: block;
  color: black;
  margin-top: 10px;
  height: 39px;
  width: 300px;
  font-size: 20px;
  padding-left: 10px;
  @media (max-width: 768px) {
    width: 200px;
  }
`;

const LoginButton = styled(Button)`
  background-color: green;
  width: 140px;
  font-size: 24px;
  height: 44px;
  color: white;
  border: none;
  border-radius: 5px;
`;

function Login({ registrationSuccessful }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleLogin(e) {
    e.preventDefault();
    setLoginError('');
    setEmailError('');
    setPasswordError('');

    const errors = [];

    if (email.trim() === '') {
      setEmailError('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email format');
    }

    if (password.trim() === '') {
      setPasswordError('Password is required');
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
    }

    if (errors.length > 0) {
      alert(errors.join('\n'));
      return;
    }

    try {
      const user = { email, password };
      const response = await fetch('http://localhost:5001/login', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        try {
          const result = await response.json();
          if (!result.successful) {
            setLoginError(result.errors[0]);
            console.error(result.errors[0]);
          } else {
            localStorage.setItem('token', result.result);
            localStorage.setItem('username', result.user.name);
            login(result.user.name);
            navigate('/');
          }
        } catch (jsonError) {
          console.error('Invalid JSON response from the server:', jsonError);
        }
      } else {
        try {
          const errorMessage = await response.json();
          console.error(errorMessage);
        } catch (jsonError) {
          console.error(
            'Invalid JSON error response from the server:',
            jsonError
          );
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.mainContainer}>
      {registrationSuccessful ? (
        <div className={styles.loginContainer}>
          <h1>SUCCESS! NOW YOU CAN TO</h1>
          <h1>LOGIN</h1>
          <form className={styles.login_form} onSubmit={handleLogin}>
            <LoginInputStyle
              labelText="E-mail"
              placeholder={'Enter e-mail:'}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            {emailError && <p className={styles.errorText}>{emailError}</p>}
            <LoginInputStyle
              type="password"
              labelText="Password"
              placeholder={'Enter password:'}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {passwordError && (
              <p className={styles.errorText}>{passwordError}</p>
            )}
            {loginError && <p className={styles.errorText}>{loginError}</p>}
            <LoginButton type="submit" text="Login" />
          </form>
        </div>
      ) : (
        <div className={styles.loginContainer}>
          <h1>Login</h1>
          <form className={styles.login_form} onSubmit={handleLogin}>
            <LoginInputStyle
              labelText="E-mail"
              placeholder={'Enter e-mail:'}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className={styles.errorText}>{emailError}</p>}
            <LoginInputStyle
              type="password"
              labelText="Password"
              placeholder={'Enter password:'}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && (
              <p className={styles.errorText}>{passwordError}</p>
            )}
            {loginError && <p className={styles.errorText}>{loginError}</p>}
            <LoginButton type="submit" text="Login" />
          </form>
          <p>
            If you do not have an account, you can{' '}
            <Link className={styles.registerLink} to="/registration">
              register.
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}

export default Login;
