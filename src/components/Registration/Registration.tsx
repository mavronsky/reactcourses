import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Input from '../../common/Input/Input.tsx'
import Button from '../../common/Button/Button.tsx'
import styles from './Registration.module.css'

import { useAuth } from '../../authContext.tsx'

import { STRINGS } from './../../constants.js'

interface User {
  name: string
  email: string
  password: string
}

function Registration(): JSX.Element {
  const navigate = useNavigate()

  const { setRegistrationSuccessful } = useAuth()

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [nameRequiredError, setNameRequiredError] = useState<string>('')
  const [emailRequiredError, setEmailRequiredError] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')
  const [registrationError, setRegistrationError] = useState<string>('')
  const [emailExistsError, setEmailExistsError] = useState<string>('')

  async function handleRegistration(e: React.FormEvent) {
    e.preventDefault()
    setNameRequiredError('')
    setEmailRequiredError('')
    setPasswordError('')
    setRegistrationError('')

    const errors: string[] = []

    if (name.trim() === '') {
      setNameRequiredError(STRINGS.nameRequiredError)
    }
    if (email.trim() === '') {
      setEmailRequiredError(STRINGS.emailRequiredError)
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailRequiredError(STRINGS.invalidEmailFormatError)
    }
    if (password.trim() === '') {
      setPasswordError(STRINGS.passwordRequiredError)
    }
    if (password.length < 6) {
      setPasswordError(STRINGS.shortPasswordError)
    }

    if (errors.length > 0) {
      alert(errors.join('\n'))
      return
    }

    try {
      const newUser: User = { name, email, password }
      const response = await fetch('http://localhost:5001/register', {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        try {
          const result = await response.json()
          if (!result.successful) {
            // Handle unsuccessful registration
          } else {
            console.log(result)
            navigate('/login')
            setRegistrationSuccessful(true)
          }
        } catch (jsonError) {
          console.error(STRINGS.invalidJsonResponseError, jsonError)
        }
      } else {
        try {
          const errorMessage = await response.json()
          console.error(errorMessage)
          if (errorMessage.errors[0].includes('exists')) {
            setEmailExistsError(STRINGS.emailExistsError)
            return
          }
        } catch (jsonError) {
          console.error(STRINGS.invalidJsonErrorResponseError, jsonError)
        }
      }
    } catch (error) {
      console.error(error)
      setPasswordError(STRINGS.shortPasswordError)
      return
    }
  }
  return (
    <div className={styles.mainContainer}>
      <div className={styles.regContainer}>
        <h1>{STRINGS.registrationTitle}</h1>
        <form className={styles.reg_form} onSubmit={handleRegistration}>
          <Input
            className={styles.inputStyle}
            labelText={STRINGS.nameLabel}
            placeholder={STRINGS.namePlaceholder}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {nameRequiredError && (
            <p className={styles.errorText}>{nameRequiredError}</p>
          )}
          <Input
            className={styles.inputStyle}
            labelText={STRINGS.emailLabel}
            placeholder={STRINGS.emailPlaceholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailExistsError && (
            <p className={styles.errorText}>{emailExistsError}</p>
          )}
          {emailRequiredError && (
            <p className={styles.errorText}>{emailRequiredError}</p>
          )}
          <Input
            className={styles.inputStyle}
            type="password"
            labelText={STRINGS.passwordLabel}
            placeholder={STRINGS.passwordPlaceholder}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <p className={styles.errorText}>{passwordError}</p>}
          {registrationError && (
            <p className={styles.errorText}>{registrationError}</p>
          )}
          <Button
            className={styles.buttonStyle}
            type="submit"
            text={STRINGS.registrationButton}
          />
        </form>
        <p>
          {STRINGS.notHaveAccountText}{' '}
          <span
            className={styles.registerLink}
            onClick={() => navigate('/login')}
          >
            {STRINGS.loginLinkText}.
          </span>
        </p>
      </div>
    </div>
  )
}

export default Registration
