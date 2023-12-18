import { StocksContext } from '../context/StocksContext';
import { useContext } from 'react';

export const useStocksContext = () => {
  const context = useContext(StocksContext);

  if (!context) {
    throw Error('useStocksContext must be used inside an StockContextProvider');
  }

  return context;
};
