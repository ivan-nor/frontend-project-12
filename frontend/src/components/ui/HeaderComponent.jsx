/* eslint-disable react/prop-types */
import { Navbar, Nav, Container } from 'react-bootstrap'

const HeaderComponent = ({ children, link, route }) => {
  return (
      <Navbar bg="dark" expand="lg" className='p-2 rounded-bottom border border-top-0' data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={link} to={route}>Hexlet chat</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={link} to={route}>Chat</Nav.Link>
          </Nav>
          {children}
        </Container>
      </Navbar>
  )
}

export default HeaderComponent
