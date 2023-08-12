import React from 'react'
import logo from './../../../../assets/logo.png'

import styles from './Logo.module.css'

interface LogoProps {
  // Если у компонента есть какие-либо пропсы, вы можете определить их здесь
}

const Logo: React.FC<LogoProps> = () => {
  return <img className={styles.logo} src={logo} alt="logo" />
}

export default Logo
