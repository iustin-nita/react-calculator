import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';


const Buttons = ({ handleClick }) => {

  const rows = {
    0: [7, 8, 9, 'C'],
    1: [4, 5, 6, '/'],
    2: [1, 2, 3, 'x'],
    3: ['.', 0, '-', '+'],
    4: ['=']
  };

  return (
    <div className="buttons">
      {
        Object.keys(rows).map(i =>
          <div key={i} className="buttonRow">
            {
              rows[i].map(rowItem =>
                <Button key={rowItem.toString()} value={rowItem.toString()} handleClick={handleClick} />
              )
            }
          </div>
        )
      }
    </div>
  )
}

Buttons.propTypes = {
  handleClick: PropTypes.func.isRequired,
}

export default Buttons;