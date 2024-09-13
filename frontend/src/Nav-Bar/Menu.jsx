import React, { useState, useEffect } from 'react'; 
import { Card, Col, Row, Button, Modal } from 'react-bootstrap'; 
import axios from 'axios'; 

export const Menu = () => {  
    const [products, setProducts] = useState([]);  
    const [showModal, setShowModal] = useState(false);  
    const [currentDish, setCurrentDish] = useState({ title: '', text: '' });  

    useEffect(() => {  
        const fetchProducts = async () => {  
            try {  
                const response = await axios.get('https://mert0nys-cafe-c2cd.twc1.net/menu/products/');  
                setProducts(response.data);  
            } catch (error) {  
                console.error('Error fetching products:', error);  
            }  
        };  

        fetchProducts();  
    }, []);  

    const handleShow = (title, text) => {  
        setCurrentDish({ title, text });  
        setShowModal(true);  
    };  

    const handleClose = () => setShowModal(false);  

    // Предположим, что у вас есть категории "Десерты" и "Аппетайзеры" 
    const categories = ['Аппетайзеры', 'Пицца', 'Десерты', 'Напитки']; 

    return (  
        <>  
            {categories.map(category => (    
                <div key={category}>   
                    <h1 className='text-center'>{category}</h1>   
                    <div className="menu-blog">  
                        <Row style={{ margin: '2px 2px' }}>  
                            {products.filter(product => product.category === category).map(product => (  
                                <Col key={product.id} xs={6} sm={6} md={4} lg={3}>  
                                    <Card className='card'>  
                                        <Card.Img variant="top" src={product.image} alt={product.name} />  
                                        <Card.Body>
                                        <div className='price' style={{ marginBottom: 'auto', minHeight: '40px', display: 'flex', alignItems: 'center' }}>
                                        {product.price} ₽
                                        </div>
                                            
                                            <Card.Title>{product.name}</Card.Title>  
                                            <div style={{ cursor: 'pointer', color: 'dark', textDecoration: 'underline' }} onClick={() => handleShow(product.name, product.description)}>  
                                                Описание  
                                            </div>  
                                        </Card.Body>   
                                    </Card>   
                                </Col>   
                            ))}   
                        </Row>   
                    </div>  
                </div>    
            ))} 

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
