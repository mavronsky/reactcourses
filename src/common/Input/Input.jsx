import React from 'react';
import styles from './Input.module.css';

function Input({
  customStyle,
  labelText,
  onChange,
  useTextarea,
  ...restProps
}) {
  const defaultStyles = {
    borderRadius: '30px',
  };

  const inputStyle = {
    ...customStyle,
    ...defaultStyles,
  };

  return (
    <>
      <label className={styles.input_container}>
        {labelText}
        {useTextarea ? (
          <textarea
            style={inputStyle}
            type="text"
            onChange={onChange}
            {...restProps}
          />
        ) : (
          <input
            style={inputStyle}
            type="text"
            onChange={onChange}
            {...restProps}
          />
        )}
      </label>
    </>
  );
}

export default Input;
