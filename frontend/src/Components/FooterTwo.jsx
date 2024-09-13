import { Container } from "react-bootstrap"


const FooterTwo = () => (
    
    
    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%' }}> {/* Добавляем стили позиционирования */}
        <Container fluid style={{ backgroundColor: '#212529', color: '#fff' }}>
            <Container style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                <p>Кафе мечты</p>
            </Container>
        </Container>
    </div>


)
export default FooterTwo