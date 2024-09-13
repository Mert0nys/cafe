import React from 'react';
import cafe1 from './images/cafe1.jpg';
import cafe3 from './images/cafe3.1.webp';
import styled from 'styled-components';
import { Container, Col, Row } from 'react-bootstrap';


const Styles = styled.div`
    .jumbo {
        background: url(${cafe1}) no-repeat fixed bottom;
        background-size: cover;
        color: #efefef;
        height: 400px;
        position: relative;
        z-index: 1;
    }

    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        z-index: 0;
    }

    .lead {
        color: #ffffff;
        padding-left: 50px;
        padding-top: 5px;
    }

    .lead-h1 {
        color: #ffffff;
        padding-left: 50px;
        padding-top: 50px;
    }

    @media (max-width: 517px) {
    .lead-h1 {
        font-size: 3rem;
    }
}

`;

const Jumbotron = () => (
    <>
    <Styles>
        <div className="jumbo">
            <div className="overlay"> 
            <h1 className=" lead-h1 display-3">О нашем чудесном кафе</h1>
            <p className="lead text-light">Кафе было создана лишь для наших клиентов, чтобы ИМ было комфортно и приятно в нашем замечательном кафе</p>
            </div>
   </div>
    </Styles>

<Container style={{marginBottom: '30px', marginTop: '30px'}}>
<Row>
    <Col xs={7} sm={10} md={9} lg={8}>
        <img className='jumimage' src={cafe3} alt='итальянское кафе' height={400}/>
    </Col>
    <Col xs={8} sm={8} md={8} lg={4} >
    <h2>Что имеется у нас?</h2>
        <p style={{ wordWrap: 'break-word' }}>
        Уютное заведение, расположенное в центре города, которое предлагает своим посетителям уникальную атмосферу и разнообразное меню. Интерьер сочетает в себе современные элементы и классические детали, создавая теплую и дружелюбную обстановку.
        </p>
    </Col>
</Row>
</Container>
</>
);




export default Jumbotron;
 
