import React from 'react';
import PropTypes from 'prop-types'


const Button = ({ type, handleClick, value }) => {
  return (
    <input
      type="button"
      className={type === 'operation' ? 'button operation-button' : 'button number-button'}
      onClick={handleClick}
      value={value}
    />
  );
}

Button.propTypes = {
  type: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
}

export default Button;