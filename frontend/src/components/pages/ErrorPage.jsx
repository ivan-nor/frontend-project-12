import { useTranslation } from 'react-i18next';
import { Card, Container } from 'react-bootstrap';

const ErrorPath = () => {
  const { t } = useTranslation();

  return (
    <Container fluid="xl">
      <Card body>{t('errors.errorPage')}</Card>
    </Container>
  );
};

export default ErrorPath;
