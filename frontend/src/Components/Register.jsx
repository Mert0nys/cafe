import React, { useState } from 'react'; 
import { Col, Button, Row, Container, Card, Form, Modal } from 'react-bootstrap'; 
import axios from 'axios'; 
import FooterTwo from './FooterTwo'

const Register = () => { 
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [email, setEmail] = useState(''); 
  const [message, setMessage] = useState(''); 
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(''); // Добавлено для обработки ошибок

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

  const registerUser = async () => { 
      const csrfToken = getCookie('csrftoken'); 
      try { 
          const response = await axios.post('https://mert0nys-cafe-e5e5.twc1.net/api/register/', { 
              email, 
              username, 
              password, 
          }, { 
              headers: { 
                  'Content-Type': 'application/json', 
                  'X-CSRFToken': csrfToken, 
              }, 
          }); 
          setMessage('Вам на почту прошло сообщение, перейдите по нему для активации аккаунта !'); 
          setIsModalOpen(true); 
      } catch (error) { 
          setErrorMessage('Ошибка при регистрации: ' + (error.response ? error.response.data : error.message)); // Обработка ошибки
          setIsModalOpen(true); 
      } 
  }; 

  const submit = async (e) => { 
      e.preventDefault(); 
      await registerUser(); 
  }; 

  const closeModal = () => { 
      setIsModalOpen(false); 
      setMessage(''); // Сбросить сообщение при закрытии модалки
      setErrorMessage(''); // Сбросить сообщение об ошибке
  }; 

  return (
    <>
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
        <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
          <Card>
            <Card.Body>
            <h2 className="fw-bold text-uppercase mb-2">Регистрация</h2>
              <Form onSubmit={submit}>
                <Form.Group controlId="formUsername">
                  <Form.Label>Имя пользователя</Form.Label>
                  <Form.Control type="text" placeholder="Введите имя пользователя" value={username} onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label>Почта (Только gmail)</Form.Label>
                  <Form.Control type="email" placeholder="Введите email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formPassword">
                  <Form.Label>Пароль</Form.Label>
                  <Form.Control type="password" placeholder="Введите пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit" style={{marginTop: '10px'}}>Зарегистрироваться</Button>
              </Form>
            </Card.Body>
          </Card>
          </div>
        </Col>
      </Row>
      <FooterTwo/>

      <Modal show={isModalOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Сообщение</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message || errorMessage}</Modal.Body> {/* Отображаем либо сообщение об успехе, либо об ошибке */}
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>Закрыть</Button>
        </Modal.Footer>
      </Modal>
    </Container>
    
    </>
  ); 
}; 

export default Register;
