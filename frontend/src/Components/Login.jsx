import React, { useState } from 'react';  
import axios from 'axios';  
import { Col, Button, Row, Container, Card, Form } from 'react-bootstrap';  
import { Link, useHistory } from 'react-router-dom';
import FooterTwo from './FooterTwo'
const Login = () => {  
  const [username, setName] = useState('');  
  const [password, setPassword] = useState('');  
  const history = useHistory();  

  const handleRedirect = () => {  
    history.push('/'); 
    setTimeout(() => { 
      window.location.reload(); // Обновление страницы через 1 секунду 
    }, 800); 
  };  

  const submit = async e => {  
    e.preventDefault();  

    const user = {  
      username,  
      password,  
    };  

    const config = {  
      headers: {  
        'Content-Type': 'application/json',  
      },  
      withCredentials: true,  
    };  

    try {  
      const { data } = await axios.post('https://mert0nys-cafe-e5e5.twc1.net/api/login/', user, config);  
      localStorage.clear(); // Очистка локального хранилища 
      console.log(data.access);  
      localStorage.setItem('access_token', data.access);  
      localStorage.setItem('refresh_token', data.refresh);  

      // Установка заголовка авторизации для всех последующих запросов
      axios.defaults.headers.common['Authorization'] = `Bearer${data.access};`  

      handleRedirect();  
    } catch (error) {  
      console.error('Ошибка при входе:', error);  
      alert('Неправильный логин или пароль'); // Сообщение об ошибке 
    }  
  };  

  return (
    <>
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <div style={{ marginTop: '2rem',  marginBottom: '2rem'}}>
          <Card>
            <Card.Body>
            <h2 className="fw-bold text-uppercase mb-2">Вход</h2>
              <Form onSubmit={submit}>
                <Form.Group controlId="formBasicUsername">
                  <Form.Label>Имя пользователя</Form.Label>
                  <Form.Control 
                    type="text" 
                    placeholder="Введите имя пользователя" 
                    value={username} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Пароль</Form.Label>
                  <Form.Control 
                    type="password" 
                    placeholder="Введите пароль" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                  />
                </Form.Group>

                <Button style={{marginTop: '10px'}} variant="primary" type="submit" block>
                  Войти
                </Button>
              </Form>
              <p className="mt-3 text-center">
                Нет аккаунта? <Link to="/register">Зарегистрируйтесь</Link>
              </p>
            </Card.Body>
          </Card>
          </div>
        </Col>
      </Row>
    </Container>
    <FooterTwo/>
    </>
  );  
};  

export default Login;
