import { useEffect } from 'react';
import { useCustomersContext } from '../hooks/useCustomersContext';
import { useAuthContext } from '../hooks/useAuthContext';

const Home = () => {
  const { dispatch } = useCustomersContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchCustomers = async () => {
      const response = await fetch(
        process.env.REACT_APP_BACKEND_API + '/api/customers',
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_CUSTOMERS', payload: json });
      }
    };

    if (user) {
      fetchCustomers();
    }
  }, [dispatch, user]);
};

export default Home;
