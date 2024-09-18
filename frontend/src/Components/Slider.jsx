import React, {useState} from 'react'
import { Carousel, Button } from 'react-bootstrap'
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
                className='slider'
                src= "https://sochi.scapp.ru/wp-content/uploads/post/2020/03/promenad_menu_obl-1.jpg"
                alt='Кафе'
                
            />
            <Carousel.Caption >
            <Button onClick={handleShow} className='button-bron' variant='primary'>
        Забронировать столик
      </Button>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className='carousel-item' >
            <img
                className='slider'
                src="https://i0.photo.2gis.com/images/branch/0/30258560091869858_2d85.jpg"
                alt='Кафе'
            />
            
            <Carousel.Caption >
            <Button onClick={handleShow} className='button-bron' variant='primary'>
        Забронировать столик
      </Button>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className='carousel-item' >
            <img
                
                className='slider'
                src="https://ch1ef.ru/upload/iblock/c91/l51u59hh34g832zuyp3ib4et8bv3rynm.jpg"
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