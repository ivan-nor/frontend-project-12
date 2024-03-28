/* eslint-disable react/prop-types */
import { Navbar, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const HeaderComponent = ({ children, link, route }) => {
  const { t } = useTranslation();

  return (
    <Navbar bg="dark" expand="lg" className="p-2 rounded-bottom border border-top-0" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={link} to={route}>{t('header.title')}</Navbar.Brand>
        {children}
      </Container>
    </Navbar>
  );
};

export default HeaderComponent;
