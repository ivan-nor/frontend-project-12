/* eslint-disable react/prop-types */
import { Navbar, Nav } from 'react-bootstrap'

const HeaderComponent = ({ children, link, route }) => {
  return (
    <Navbar bg="white" expand="lg" className='p-2'>
      <Navbar.Brand as={link} to={route}>Hexlet chat</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link as={link} to={route}>Chat</Nav.Link>
      </Nav>
      {children}
    </Navbar>
  )
}

export default HeaderComponent
