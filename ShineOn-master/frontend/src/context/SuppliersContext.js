import React from 'react';
import { createContext, useReducer } from 'react';

export const SuppliersContext = createContext();

export const suppliersReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SUPPLIERS':
      return {
        suppliers: action.payload,
      };
    case 'CREATE_SUPPLIER':
      return {
        suppliers: [action.payload, ...state.suppliers],
      };
    case 'DELETE_SUPPLIER':
      return {
        suppliers: state.suppliers.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const SuppliersContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(suppliersReducer, {
    suppliers: null,
  });

  return (
    <SuppliersContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SuppliersContext.Provider>
  );
};
