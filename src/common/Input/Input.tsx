import React, { CSSProperties, InputHTMLAttributes, ReactNode } from 'react'
import styles from './Input.module.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  customStyle?: CSSProperties
  labelText: ReactNode
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void
  useTextarea?: boolean
}

const Input: React.FC<InputProps> = ({
  customStyle,
  labelText,
  onChange,
  useTextarea,
  ...restProps
}) => {
  const defaultStyles: CSSProperties = {
    borderRadius: '5px',
  }

  const inputStyle: CSSProperties = {
    ...customStyle,
    ...defaultStyles,
  }

  return (
    <label className={styles.input_container}>
      {labelText}
      {useTextarea ? (
        <textarea
          style={inputStyle}
          onChange={onChange as React.ChangeEventHandler<HTMLTextAreaElement>}
          {...(restProps as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          style={inputStyle}
          onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
          {...restProps}
        />
      )}
    </label>
  )
}

export default Input
