import React, { useState } from 'react';
import styles from './SearchBar.module.css';
import styled from 'styled-components';
import { searchButtonText, searchPlaceholder } from '../../../../constants';

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
`;

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
`;

const SearchBar = ({ value, onSubmit }) => {
  const [searchText, setSearchText] = useState(value);

  const handleInputChange = (e) => {
    const newSearchText = e.target.value;

    if (newSearchText.length == 0) {
      onSubmit('');
    }

    setSearchText(newSearchText);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Предотвращаем стандартное поведение отправки формы

    const trimmedSearchText = searchText.trim(); // Убираем лишние пробелы

    if (trimmedSearchText.length === 0) {
      onSubmit('');
    } else {
      onSubmit(trimmedSearchText);
    }
  };

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
  );
};

export default SearchBar;
