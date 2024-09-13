import React, {useState} from 'react'
import { Carousel, Button } from 'react-bootstrap'
import cafe1 from './images/cafe1.jpg'
import cafe2 from './images/cafe2.jpg'
import cafe3 from './images/cafe3.jpg';
import BookingModal from './Booking';

export default function NaviBar() {
    const [showBron, setShowBron] = useState(false);
    const handleShow = () => setShowBron(true);
    const handleClose = () => setShowBron(false);
  return (
    <>
    <Carousel>
        <Carousel.Item className='carousel-item' >
            <img
                className='d-block w-100'
                src={cafe1}
                alt='Кафе'
                
            />
            <Carousel.Caption>
            <Button onClick={handleShow} className='button-bron' variant='primary'>
        Забронировать столик
      </Button>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className='carousel-item' >
            <img
                className='d-block w-100'
                src={cafe2}
                alt='Кафе'
            />
            
            <Carousel.Caption>
            <Button onClick={handleShow} className='button-bron' variant='primary'>
        Забронировать столик
      </Button>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className='carousel-item' >
            <img
                className='d-block w-100'
                src={cafe3}
                alt='Кафе'
            />
            
            <Carousel.Caption>
            <Button onClick={handleShow} className='button-bron' variant='primary'>
        Забронировать столик
      </Button>
            </Carousel.Caption>
        </Carousel.Item>
    </Carousel>
    <BookingModal showBron={showBron} handleCloseBron={handleClose} />
    </>
  );
}