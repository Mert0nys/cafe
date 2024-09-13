
import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios'
const Logout = () => {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    delete axios.defaults.headers.common['Authorization'];
    history.push('/'); // Перенаправление на страницу логина
  };

  React.useEffect(() => {
    handleLogout();
  }, []);

  const timer = setTimeout(() => {
    window.location.reload();
  }, 100);

  return() => clearTimeout(timer)

  return null; // Не отображаем ничего на экране
};

export default Logout;
