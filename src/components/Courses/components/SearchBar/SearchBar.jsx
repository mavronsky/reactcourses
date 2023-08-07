import React from 'react';
import { useState } from 'react';
import Input from '../../../../common/Input/Input';
import Button from '../../../../common/Button/Button';
import styles from './SearchBar.module.css';

import { inputStyleMedium, searchButtonStyle } from '../../../../styles';
import { searchButtonText, searchPlaceholder } from '../../../../constants';

const SearchBar = ({ onSearchClick }) => {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchClick = (e) => {
    e.preventDefault();
    onSearchClick(searchText.trim());
  };

  return (
    <div className={styles.form}>
      <Input
        style={inputStyleMedium}
        type="text"
        onChange={handleInputChange}
        placeholder={searchPlaceholder}
        value={searchText}
      />
      <Button
        style={searchButtonStyle}
        text={searchButtonText}
        type="submit"
        onClick={handleSearchClick}
      />
    </div>
  );
};

export default SearchBar;
