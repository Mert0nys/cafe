import React, { useEffect } from 'react';
import axios from 'axios'
import { useHistory } from 'react-router-dom';

const Logout = () => {
  const history = useHistory();

  useEffect(() => {
    (async () => {
      try {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        };

        const { data } = await axios.post(
          'http://localhost:8000/logout/',
          { refresh_token: localStorage.getItem('refresh_token') },
          config
        );

        
        if (data.success) { 
          localStorage.clear();
          axios.defaults.headers.common['Authorization'] = null;
          history.replace('/');
        } else {
          console.log('Ошибка выхода', data.error || 'Неизвестная ошибка'); 
          // Обработка ошибки выхода
        }
      } catch (e) {
        console.log('Ошибка выхода', e);
        // Обработка ошибки выхода
      }
    })();
  }, []);

  return (
    <div></div>
  );
};

export default Logout;