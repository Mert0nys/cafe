import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const BookingModal = ({ showBron, handleCloseBron }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
  
      try {
        const response = await axios.post('https://mert0nys-cafe-c2cd.twc1.net/api/bron/reservations/', {
          name,
          phone,
        });
  
        console.log('Response:', response.data);
        setSuccessMessage('Спасибо, мы скоро с вами свяжемся!');
        handleCloseBron();
      } catch (error) {
        console.error('Ошибка при отправке заявки:', error);
        setError('Произошла ошибка. Пожалуйста, попробуйте еще раз.');
      }
    };
  
    return (
      <Modal show={showBron} onHide={handleCloseBron}>
        <Modal.Header>
          <Modal.Title>Забронировать столик</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicName">
              <Form.Label>Имя</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите ваше имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
  
            <Form.Group controlId="formBasicPhone">
              <Form.Label>Телефон</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Введите ваш телефон"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </Form.Group>
  
            <Button variant="primary" type="submit" style={{marginTop: '9px'}}>
              Забронировать
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  };
  
  export default BookingModal;