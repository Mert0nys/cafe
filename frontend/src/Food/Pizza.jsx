import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Button, Modal } from 'react-bootstrap';
import axios from 'axios';

export const Pizza = () => {   
    const [showModal, setShowModal] = useState(false);   
    const [currentDish, setCurrentDish] = useState({ title: '', text: '' });   
    const [pizzas, setPizzas] = useState([]); // Состояние для хранения пиццы

    useEffect(() => {
        const fetchPizzas = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/products/pizzas/', {
                    headers: {
                        'Content-Type': 'application/json',
                        // другие заголовки, если необходимо
                    }
                }) // Замените URL на ваш API
                setPizzas(response.data); 
            } catch (error) {
                console.error('Error fetching pizzas:', error);
            }
        };

        fetchPizzas(); 
    }, []); 

    const handleShow = (title, text) => {   
        setCurrentDish({ title, text });   
        setShowModal(true);   
    };   
  
    const handleClose = () => setShowModal(false);   
  
    return (   
        <>   
            <h1 className='text-center mt-5'>Пицца</h1>   
            <div className="menu-blog">   
                <Row style={{ margin: '2px 2px' }}>   
                    {pizzas.map((pizza) => (   
                        <Col key={pizza.id} xs={6} sm={6} md={4} lg={3}>   
                            <Card className='card'>   
                                <Card.Img variant="top" src={pizza.image} alt={pizza.name} />
                                <Card.Body>   
                                    <div className='price'>{pizza.price}</div>   
                                    <Card.Title>{pizza.name}</Card.Title>   
                                    <div style={{ cursor: 'pointer', color: 'dark', textDecoration: 'underline' }} onClick={() => handleShow(pizza.name, pizza.description)}>   
                                        Описание   
                                    </div>   
                                </Card.Body>   
                            </Card>   
                        </Col>   
                    ))}   
                </Row>   
            </div>   
  
            {/* Модальное окно для отображения описания блюда */}   
            <Modal show={showModal} onHide={handleClose} centered>   
                <Modal.Header closeButton>   
                    <Modal.Title>{currentDish.title}</Modal.Title>   
                </Modal.Header>   
                <Modal.Body>{currentDish.text}</Modal.Body>   
                <Modal.Footer>   
                    <Button variant="secondary" onClick={handleClose}>   
                        Закрыть   
                    </Button>   
                </Modal.Footer>   
            </Modal>   
        </>   
    );   
};
 