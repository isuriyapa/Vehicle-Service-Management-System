import { createContext, useReducer } from 'react';

export const StocksContext = createContext();

export const stocksReducer = (state, action) => {
  switch (action.type) {
    case 'SET_STOCKS':
      return {
        stocks: action.payload,
      };
    case 'CREATE_STOCK':
      return {
        stocks: [action.payload, ...state.stocks],
      };
    case 'DELETE_STOCK':
      return {
        stocks: state.stocks.filter((w) => w._id !== action.payload._id),
      };
    case 'UPDATE_STOCK':
      return {
        stocks: state.stocks.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const StocksContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(stocksReducer, {
    stocks: null,
  });

  return (
    <StocksContext.Provider value={{ ...state, dispatch }}>
      {children}
    </StocksContext.Provider>
  );
};
