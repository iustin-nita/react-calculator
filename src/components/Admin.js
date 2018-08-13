import React from 'react';
import PropTypes from 'prop-types';


const Admin = ({ clearHistory, searchInput, filteredListItems }) => {
  return (
    <div className="admin">
      <input
        placeholder="Search results..."
        type="number"
        ref={searchInput}
      />
      <button onClick={clearHistory}>Clear history</button>
      {filteredListItems.length ?
        <ul>
          {filteredListItems}
        </ul>
        : <p>No items</p>
      }
    </div>
  )
}

Admin.propTypes = {
  clearHistory: PropTypes.func,
  filteredListItems: PropTypes.array,
}

export default Admin;