import React, { useState, SyntheticEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './../../authContext'

import Input from '../../common/Input/Input'
import Button from '../../common/Button/Button'

import styles from './Login.module.css'

import { STRINGS } from '../../constants'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [loginError, setLoginError] = useState('')
  const [invalidDataError, setInvalidDataError] = useState('')

  const navigate = useNavigate()

  const { login, registrationSuccessful } = useAuth()

  async function handleLogin(e: SyntheticEvent) {
    e.preventDefault()
    setLoginError('')
    setEmailError('')
    setPasswordError('')

    const errors: string[] = []

    if (email.trim() === '') {
      setEmailError('Email is required')
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email format')
    }

    if (password.trim() === '') {
      setPasswordError('Password is required')
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters.')
    }

    if (errors.length > 0) {
      alert(errors.join('\n'))
      return
    }

    try {
      const user = { email, password }
      const response = await fetch('http://localhost:5001/login', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        try {
          const result = await response.json()
          if (!result.successful) {
            setLoginError(result.errors[0])
            console.error(result.errors[0])
          } else {
            localStorage.setItem('token', result.result)
            localStorage.setItem('username', result.user.name)
            login(result.user.name)
            navigate('/')
          }
        } catch (jsonError) {
          console.error('Invalid JSON response from the server:', jsonError)
        }
      } else {
        try {
          const errorMessage = await response.json()
          console.error(errorMessage.result)
          if (errorMessage.result.includes('Invalid data')) {
            setInvalidDataError('Invalid data.')
          }
        } catch (jsonError) {
          console.error(
            'Invalid JSON error response from the server:',
            jsonError
          )
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className={styles.mainContainer}>
      {registrationSuccessful ? (
        <div className={styles.loginContainer}>
          <h1>{STRINGS.loginSuccessHeader}</h1>
          <h1>{STRINGS.loginSuccessSubheader}</h1>
          <form className={styles.login_form} onSubmit={handleLogin}>
            <Input
              labelText={STRINGS.emailLabel}
              className={styles.inputStyle}
              placeholder={STRINGS.emailPlaceholder}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            {emailError && <p className={styles.errorText}>{emailError}</p>}
            <Input
              type="password"
              className={styles.inputStyle}
              labelText={STRINGS.passwordLabel}
              placeholder={STRINGS.passwordPlaceholder}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {passwordError && (
              <p className={styles.errorText}>{passwordError}</p>
            )}
            {loginError && <p className={styles.errorText}>{loginError}</p>}
            <Button
              className={styles.buttonStyle}
              type="submit"
              text={STRINGS.loginButtonText}
            />
            {invalidDataError && (
              <p className={styles.errorText}>{invalidDataError}</p>
            )}
          </form>
        </div>
      ) : (
        <div className={styles.loginContainer}>
          <h1>{STRINGS.loginHeader}</h1>
          <form className={styles.loginForm} onSubmit={handleLogin}>
            <Input
              className={styles.inputStyle}
              labelText={STRINGS.emailLabel}
              placeholder={STRINGS.emailPlaceholder}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className={styles.errorText}>{emailError}</p>}
            <Input
              className={styles.inputStyle}
              type="password"
              labelText={STRINGS.passwordLabel}
              placeholder={STRINGS.passwordPlaceholder}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && (
              <p className={styles.errorText}>{passwordError}</p>
            )}
            {loginError && <p className={styles.errorText}>{loginError}</p>}
            {invalidDataError && (
              <p className={styles.errorText}>{invalidDataError}</p>
            )}
            <Button
              className={styles.buttonStyle}
              type="submit"
              text={STRINGS.loginButtonText}
            />
          </form>
          <p>
            {STRINGS.registerAccountText}{' '}
            <span
              className={styles.registerLink}
              onClick={() => navigate('/registration')}
            >
              {STRINGS.registerLinkText}
            </span>
          </p>
        </div>
      )}
    </div>
  )
}

export default Login
