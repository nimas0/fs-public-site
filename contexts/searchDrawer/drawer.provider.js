import React, { useReducer } from 'react';
import { SearchDrawerContext } from './drawer.context';

const initialState = {
  isOpen: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'TOGGLE':
      return {
        ...state,
        isOpen: !state.isOpen,
      };
    default:
      return state;
  }
}
export const SearchDrawerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <SearchDrawerContext.Provider value={{ state, dispatch }}>
      {children}
    </SearchDrawerContext.Provider>
  );
};
