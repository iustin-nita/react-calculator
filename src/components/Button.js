import React from 'react';
import PropTypes from 'prop-types'


const Button = ({ handleClick, value }) => {
  return (
    <input
      type="button"
      className='button'
      onClick={handleClick}
      value={value}
    />
  );
}

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
}

export default Button;