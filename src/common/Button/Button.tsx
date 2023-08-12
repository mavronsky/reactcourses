import React, { CSSProperties, ReactNode, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  customStyle?: CSSProperties
  text: ReactNode
}

const Button: React.FC<ButtonProps> = ({
  customStyle,
  onClick,
  text,
  ...restProps
}) => {
  const buttonStyle: CSSProperties = {
    ...customStyle,
  }

  return (
    <button style={buttonStyle} {...restProps} onClick={onClick}>
      {text}
    </button>
  )
}

export default Button
