import React from 'react'
import Slider from '../Components/Slider'
import { Card, Col, Container, Row, Button } from 'react-bootstrap'
import Jumbotron from '../Components/Jumbotron'
import { Link } from 'react-router-dom';
import dreenk from '../Components/images/dreenk.jpg'
import deserts1 from '../Components/images/deserts1.jpg'
import hot from '../Components/images/hot.jpg'
import Footer from '../Components/Footer';
export const Home = () => {
        
    return (
        <>
            <Slider />
            <Container style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
                <Row>
                    <Col xs={12} sm={5} md={6} lg={4}>
                        <Card className='card-deserts'>
                            <Card.Img variant='top' src={deserts1} />
                            <Card.Body>
                                <Card.Title>Наши десерты</Card.Title>
                                <Card.Text>
                                    Все наши десерты - уникальны! Мы сами можете в этом убедиться
                                </Card.Text>
                                <Button as={Link} to="/menu" variant="primary">Меню</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={12} sm={5} md={6} lg={4} className="card-margin-hot">
                        <Card className='card-hot'>
                            <Card.Img variant='top' src={hot} />
                            <Card.Body>
                                <Card.Title>Горячие блюда</Card.Title>
                                <Card.Text>
                                    У нас также огромный выбор горячих блюд, от супов до стейков
                                </Card.Text>
                                <Button as={Link} to="/menu" variant="primary">Меню</Button>
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col xs={12} sm={5} md={6} lg={4}>
                        <Card className='card-dreenk'>
                            <Card.Img variant='top' src={dreenk} />
                            <Card.Body>
                                <Card.Title>Напитки</Card.Title>
                                <Card.Text>
                                Также нельзя забывать и про напитка, у нас имеется все! От воды до элитного алкоголя!!!
                                </Card.Text>
                                <Button as={Link} to="/menu" variant="primary">Меню</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <Jumbotron />
            <Footer/>
        </>
    );
};