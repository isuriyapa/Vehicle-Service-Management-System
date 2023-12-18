import { SuppliersContext } from '../context/SuppliersContext';
import { useContext } from 'react';

export const useSuppliersContext = () => {
  const context = useContext(SuppliersContext);

  if (!context) {
    throw Error(
      'useSuppliersContext must be used inside an SuppliersContextProvider'
    );
  }

  return context;
};
