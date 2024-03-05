/* eslint-disable react/prop-types */
import { Container, Row, Col, Card, Image } from 'react-bootstrap'
import loginImage from '../../assets/images/login.jpg'

const LoginComponent = ({ children }) => {
  return (
    <Container fluid={true}>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={10} lg={8} xs={12}>
          <Card className="shadow">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <Image src={loginImage} alt='login image' roundedCircle/>
              {children}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginComponent
