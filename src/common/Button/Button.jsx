function Button({ customStyle, onClick, text, ...restProps }) {
  const defaultStyles = {
    borderRadius: '10px',
    color: 'red',
  };

  const buttonStyle = {
    ...customStyle,
    ...defaultStyles,
  };

  return (
    <button style={buttonStyle} {...restProps} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
