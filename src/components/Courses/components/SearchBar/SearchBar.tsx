import React, { useState, ChangeEvent, FormEvent } from 'react'
import styles from './SearchBar.module.css'
import styled from 'styled-components'
import { searchButtonText, searchPlaceholder } from '../../../../constants'

interface SearchBarProps {
  value: string
  onSubmit: (searchText: string) => void
}

const SearchButton = styled.button`
  background-color: blue;
  width: 67px;
  font-size: 15px;
  height: 42px;
  color: white;
  cursor: pointer;
  border: none;
  margin-left: 2px;
  border-radius: 0px 5px 5px 0px;
`

const InputStyle = styled.input`
  display: block;
  color: black;
  font-size: 18px;
  margin-bottom: 18px;
  height: 39px;
  width: 300px;
  @media (max-width: 768px) {
    width: 176px;
  }
`

const SearchBar: React.FC<SearchBarProps> = ({ value, onSubmit }) => {
  const [searchText, setSearchText] = useState<string>(value)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newSearchText = e.target.value

    if (newSearchText.length === 0) {
      onSubmit('')
    }

    setSearchText(newSearchText)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault() // Предотвращаем стандартное поведение отправки формы

    const trimmedSearchText = searchText.trim() // Убираем лишние пробелы

    if (trimmedSearchText.length === 0) {
      onSubmit('')
    } else {
      onSubmit(trimmedSearchText)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <InputStyle
        type="text"
        onChange={handleInputChange}
        placeholder={searchPlaceholder}
        value={searchText}
      />
      <SearchButton type="submit">{searchButtonText}</SearchButton>
    </form>
  )
}

export default SearchBar
