/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import { Navbar, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarToggler,
  MDBNavbarLink,
  MDBContainer,
  MDBIcon,
  MDBCollapse,
  MDBBtn
} from 'mdb-react-ui-kit'

const HeaderComponent = ({ children, link, route }) => {
  const { t } = useTranslation()

  return (
    <header>
      <MDBNavbar expand='lg' bgColor='dark'>
        <MDBContainer className="px-3">
            <MDBNavbarNav right className='mb-2 mb-lg-0 d-flex flex-row justify-content-between align-items-center'>
              <MDBNavbarItem active>
                <Link to={route} className='fw-bold text-light'>
                  {t('header.title')}
                </Link>
              </MDBNavbarItem>
              <MDBNavbarItem>
                {children}
              </MDBNavbarItem>
            </MDBNavbarNav>
        </MDBContainer>
      </MDBNavbar>
    </header>

  // <Navbar className="p-3 mb-2 bg-dark bg-gradient text-white rounded-5">
  //   <Container>
  //     <Navbar.Brand as={link} to={route}>{t('header.title')}</Navbar.Brand>
  //     {children}
  //   </Container>
  // </Navbar>
  )
}

export default HeaderComponent
