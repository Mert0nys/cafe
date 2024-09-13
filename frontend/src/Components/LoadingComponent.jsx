import React, { useState, useEffect } from 'react';
import './LoadingComponent.css';
import { Spinner } from 'react-bootstrap';
import Activate from './Activate';
const LoadingComponent = () => {
  const [loading, setLoading] = useState(true);

  <Activate/>
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); 

    return () => clearTimeout(timer); 
  }, []);

  return (
    <div className="loading-container d-flex justify-content-center align-items-center vh-100">
      {loading ? (
        <Spinner animation="border" role="status" className="loader">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
        <div className="message-load" style={{ fontSize: '35px' }}>Проверка аккаунта прошла успешно!</div>
      )}
    </div>
  );
};

export default LoadingComponent;
