import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';

import styles from './Registration.module.css';
import styled from 'styled-components';

const RegistrationInputStyle = styled(Input)`
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

const RegistrationButton = styled(Button)`
  background-color: green;
  width: 140px;
  font-size: 24px;
  height: 44px;
  color: white;
  border: none;
  margin-top: 15px;
  border-radius: 5px;
`;

function Registration({ setRegistrationSuccessful }) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [registrationError, setRegistrationError] = useState('');
  const [emailExistsError, setEmailExistsError] = useState('');

  async function handleRegistration(e) {
    e.preventDefault();
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setRegistrationError('');

    const errors = [];
    if (name.trim() === '') {
      setNameError('Name is required');
    }
    if (email.trim() === '') {
      setEmailError('Email is required');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email format');
    }
    if (password.trim() === '') {
      setPasswordError('Password is required');
    }
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
    }

    if (errors.length > 0) {
      alert(errors.join('\n'));
      return;
    }

    try {
      const newUser = { name, email, password };
      const response = await fetch('http://localhost:5001/register', {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        try {
          const result = await response.json();
          if (!result.successful) {
          } else {
            console.log(result);
            navigate('/login');
            setRegistrationSuccessful(true);
          }
        } catch (jsonError) {
          console.error('Invalid JSON response from the server:', jsonError);
        }
      } else {
        try {
          const errorMessage = await response.json();
          console.error(errorMessage);
          if (errorMessage.errors[0].includes('exists'));
          {
            setEmailExistsError('Email already exists');
            return;
          }
        } catch (jsonError) {
          console.error(
            'Invalid JSON error response from the server:',
            jsonError
          );
        }
      }
    } catch (error) {
      console.error(error);
      setPasswordError('Password must be at least 6 characters.');
      return;
    }
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.regContainer}>
        <h1>Registration</h1>
        <form className={styles.reg_form} onSubmit={handleRegistration}>
          <RegistrationInputStyle
            labelText="Name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {nameError && <p className={styles.errorText}>{nameError}</p>}
          <RegistrationInputStyle
            labelText="E-mail"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailExistsError && (
            <p className={styles.errorText}>{emailExistsError}</p>
          )}
          {emailError && <p className={styles.errorText}>{emailError}</p>}
          <RegistrationInputStyle
            type="password"
            labelText="Password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <p className={styles.errorText}>{passwordError}</p>}
          {registrationError && (
            <p className={styles.errorText}>{registrationError}</p>
          )}
          <RegistrationButton type="submit" text="Registration" />
        </form>
        <p>
          If you do not have an account, you can{' '}
          <Link className={styles.registerLink} to="/login">
            login.
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Registration;