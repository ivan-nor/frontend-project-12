/* eslint-disable react/prop-types */
import { Container, Row, Col, Card, Image } from 'react-bootstrap'
import loginImage from '../../assets/images/login.jpg'
import { Link } from 'react-router-dom'

const LoginComponent = ({ children }) => {
  return (
    <Container fluid={true}>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={10} lg={8} xs={12}>
          <Card className="shadow">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <Image src={loginImage} alt='login image' roundedCircle/>
              <div>
                <h1 className="text-center mb-4">Войти</h1>
                {children}
              </div>
            </Card.Body>
            <Card.Footer className='p-4'>
              <div className='text-center'>
                <span>Нет аккаунта?</span>
                <Link to={'/signup'}>
                  <span>Регистрация</span>
                </Link>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginComponent
