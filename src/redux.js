import { createStore } from 'redux';

const INITIAL_STATE = {
  list: [],
  admin: false,
};


const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADD_COMPUTE_TO_LIST': {
      return {
        ...state,
        list: [...state.list, action.payload]
      }
    }
    case 'TOGGLE_ADMIN': {
      return {
        ...state,
        admin: !state.admin
      }
    }
    default: return state;
  }
}

export const toggleAdmin = () =>
  ({
    type: 'TOGGLE_ADMIN',
    payload: ''
  });

export const addToList = (operation) =>
  ({
    type: 'ADD_COMPUTE_TO_LIST',
    payload: operation
  });


export const getList = state => state.list;
export const isAdmin = state => state.admin;

export default reducer;