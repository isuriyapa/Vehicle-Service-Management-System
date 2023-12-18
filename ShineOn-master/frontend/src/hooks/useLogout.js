import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user');

    localStorage.clear();
    sessionStorage.clear();

    // dispatch logout action
    dispatch({ type: 'LOGOUT' });

    window.location.href = '/login';
  };

  return { logout };
};
