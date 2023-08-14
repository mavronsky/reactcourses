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

  const [formData, setFormData] = useState<User>({
    name: '',
    email: '',
    password: '',
  })

  const [errors, setErrors] = useState<{
    name: string | null
    email: string | null
    password: string | null
    registration: string | null
    emailExists: string | null
  }>({
    name: null,
    email: null,
    password: null,
    registration: null,
    emailExists: null,
  })

  async function handleRegistration(e: React.FormEvent) {
    e.preventDefault()
    setErrors({
      name: null,
      email: null,
      password: null,
      registration: null,
      emailExists: null,
    })

    const { name, email, password } = formData
    const validationErrors: string[] = []

    if (name.trim() === '') {
      validationErrors.push(STRINGS.nameRequiredError)
    }

    if (email.trim() === '' || !/\S+@\S+\.\S+/.test(email)) {
      validationErrors.push(
        email.trim() === ''
          ? STRINGS.emailRequiredError
          : STRINGS.invalidEmailError
      )
    }

    if (password.trim() === '' || password.length < 6) {
      validationErrors.push(
        password.trim() === ''
          ? STRINGS.passwordRequiredError
          : STRINGS.shortPasswordError
      )
    }

    if (validationErrors.length > 0) {
      alert(validationErrors.join('\n'))
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
        const result = await response.json()
        if (!result.successful) {
          setErrors({ ...errors, registration: STRINGS.registrationError })
        } else {
          console.log(result)
          navigate('/login')
          setRegistrationSuccessful(true)
        }
      } else {
        try {
          const errorMessage = await response.json()
          console.error(errorMessage)
          if (errorMessage.errors[0].includes('exists')) {
            setErrors({ ...errors, emailExists: STRINGS.existingEmailError })
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
      setErrors({ ...errors, registration: STRINGS.registrationError })
    }
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.regContainer}>
        <h1>{STRINGS.registrationHeader}</h1>
        <form className={styles.reg_form} onSubmit={handleRegistration}>
          <Input
            className={styles.inputStyle}
            labelText={STRINGS.nameLabel}
            placeholder={STRINGS.namePlaceholder}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          {errors.name && <p className={styles.errorText}>{errors.name}</p>}
          <Input
            className={styles.inputStyle}
            labelText={STRINGS.emailLabel}
            placeholder={STRINGS.emailPlaceholder}
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          {errors.emailExists && (
            <p className={styles.errorText}>{errors.emailExists}</p>
          )}
          {errors.email && <p className={styles.errorText}>{errors.email}</p>}
          <Input
            className={styles.inputStyle}
            type="password"
            labelText={STRINGS.passwordLabel}
            placeholder={STRINGS.passwordPlaceholder}
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          {errors.password && (
            <p className={styles.errorText}>{errors.password}</p>
          )}
          {errors.registration && (
            <p className={styles.errorText}>{STRINGS.registrationError}</p>
          )}
          <Button
            className={styles.buttonStyle}
            type="submit"
            text={STRINGS.registrationButtonText}
          />
        </form>
        <p>
          If you do not have an account, you can{' '}
          <span
            className={styles.registerLink}
            onClick={() => navigate('/login')}
          >
            {STRINGS.loginLinkText}
          </span>
        </p>
      </div>
    </div>
  )
}

export default Registration
