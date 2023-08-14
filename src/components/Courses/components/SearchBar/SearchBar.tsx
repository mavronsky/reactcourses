import React, { useState, ChangeEvent, FormEvent } from 'react'
import styles from './SearchBar.module.css'
import styled from 'styled-components'
import { STRINGS } from '../../../../constants'

import Input from '../../../../common/Input/Input'
import Button from '../../../../common/Button/Button'

interface SearchBarProps {
  value: string
  onSubmit: (searchText: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onSubmit }) => {
  const [searchText, setSearchText] = useState<string>(value)

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newSearchText = e.target.value

    if (e.target instanceof HTMLInputElement) {
      if (newSearchText.length === 0) {
        onSubmit('')
      }

      setSearchText(newSearchText)
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const trimmedSearchText = searchText.trim()

    if (trimmedSearchText.length === 0) {
      onSubmit('')
    } else {
      onSubmit(trimmedSearchText)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        className={styles.inputStyle}
        type="text"
        onChange={handleInputChange}
        placeholder={STRINGS.searchPlaceholder}
        value={searchText}
      />
      <Button
        className={styles.searchButton}
        type="submit"
        text={STRINGS.searchButtonText}
      />
    </form>
  )
}

export default SearchBar
