import { useTranslation } from 'react-i18next'
import { Card, Container } from 'react-bootstrap'

export default function ErrorPath () {
  const { t } = useTranslation()

  return (
    <Container fluid='xl'>
      <Card body>{t('errors.errorPage')}</Card>
    </Container>
  )
}
