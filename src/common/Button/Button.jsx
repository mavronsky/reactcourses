function Button({ customStyle, onClick, text, ...restProps }) {
  const buttonStyle = {
    ...customStyle,
  };

  return (
    <button style={buttonStyle} {...restProps} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
