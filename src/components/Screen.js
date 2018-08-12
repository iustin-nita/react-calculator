import React, { Component } from 'react';
import PropTypes from 'prop-types';


const Screen = ({ input, output }) => {
  return (
    <div className="display">
      <div className="input">{input}</div>
      <div className="output">{output}</div>
    </div>
  );
};

Screen.propTypes = {
  input: PropTypes.string.isRequired,
  output: PropTypes.string.isRequired
}

export default Screen;
