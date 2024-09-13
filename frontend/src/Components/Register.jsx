import React, { useState } from 'react';
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для открытия модалки
  const modalStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px',
        textAlign: 'center',
    },
};
  const getCookie = (name) => {
      let cookieValue = null;
      if (document.cookie && document.cookie !== '') {
          const cookies = document.cookie.split(';');
          for (let i = 0; i < cookies.length; i++) {
              const cookie = cookies[i].trim();
              if (cookie.substring(0, name.length + 1) === (name + '=')) {
                  cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                  break;
              }
          }
      }
      return cookieValue;
  };

  const registerUser = async (email, username, password) => {
      const csrfToken = getCookie('csrftoken');
      try {
          const response = await axios.post('https://mert0nys-cafe-c2cd.twc1.net/api/register/', {
              email,
              username,
              password,
          }, {
              headers: {
                  'Content-Type': 'application/json',
                  'X-CSRFToken': csrfToken,
              },
          });
          console.log('Регистрация успешна:', response.data);
          setIsModalOpen(true); // Открыть модалку
          setErrorMessage(''); // Сбросить сообщение об ошибке
          return response.data;
      } catch (error) {
          setErrorMessage('Ошибка при регистрации: ' + (error.response ? error.response.data : error.message));
          setIsModalOpen(false); // Закрыть модалку
          throw error;
      }
  };

  const submit = async (e) => {
      e.preventDefault();
      try {
          await registerUser(email, username, password);
          setIsModalOpen(true);
          
      } catch (error) {
          setErrorMessage('Ошибка при регистрации. Пожалуйста, попробуйте еще раз.');
      }
  };

  const closeModal = () => {
      setIsModalOpen(false);
  };

    return (
      <Container>
        <Form onSubmit={submit}>
          <Row className="vh-100 d-flex justify-content-center align-items-center">
            <Col md={8} lg={6} xs={12}>
              <Card className="shadow">
                <Card.Body>
                  <div className="mb-3 mt-4">
                    <h2 className="fw-bold text-uppercase mb-2">Регистрация</h2>
                    <p className="mb-5">Кафе Italy</p>
                    {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                    
                    {isModalOpen && (
                <div style={modalStyles.overlay}>
                    <div style={modalStyles.modal}>
                        <h2>Успех!</h2>
                        <p>На вашу почту было отправлено ссылка для подтверждения аккаунта.</p>
                        <button onClick={closeModal}>Закрыть</button>
                    </div>
                </div>
            )}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className="text-center">Ваша почта ( Только gmail )</Form.Label>
                      <input
                        className="form-control mt-1"
                        placeholder="Почта"
                        name='email'
                        type='text'
                        value={email}
                        required
                        onChange={e => setEmail(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                      <Form.Label className="text-center">Ваше имя</Form.Label>
                      <input
                        className="form-control mt-1"
                        placeholder="Имя"
                        name='username'
                        type='text'
                        value={username}
                        required
                        onChange={e => setUsername(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label className="text-center">Ваш пароль</Form.Label>
                      <input
                        name='password'
                        type="password"
                        className="form-control mt-1"
                        placeholder="Пароль"
                        value={password}
                        required
                        onChange={e => setPassword(e.target.value)}
                      />
                    </Form.Group>
                    <div className="d-grid">
                      <Button variant="primary" type="submit">  
                        Зарегистрироваться 
                      </Button> 
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Form>
      </Container>
    );
  };
    
export default Register;