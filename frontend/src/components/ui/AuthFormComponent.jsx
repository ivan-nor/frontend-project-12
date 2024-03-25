/* eslint-disable react/prop-types */
import { Container, Row, Col, Card, Image } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import getImages from '../../assets/images/images'
// import { useEffect } from 'react'

const AuthForm = ({ name, children }) => {
  const { t } = useTranslation()
  const image = getImages(name)
  const isShowFooter = (name === 'login')

  // useEffect(() => console.log((`/${${name}.footer.link`)))

  return (
    <Container fluid={true} className='vh-100'>
      <Row className="h-100 justify-content-center align-items-center">
        <Col md={10} lg={8} xs={12} xxl={6}>
          <Card className="shadow">
            <Card.Header className=''>{t(`${name}.title`)}</Card.Header>
            <Card.Body className="p-5">
              <Row>
                <Col className='d-flex align-items-center justify-content-center' md={6} sm={12}>
                  <Image src={image} alt={`${name} image`} roundedCircle />
                </Col>
                {children}
              </Row>
            </Card.Body>
            { isShowFooter &&
              <Card.Footer className='p-4'>
                <div className='text-center'>
                  <span>{t(`${name}.footer.label`)}</span>
                  <Link to={`/${t(`${name}.footer.link`)}`}>
                    {t(`${name}.footer.title`)}
                  </Link>
                </div>
              </Card.Footer>
            }
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default AuthForm
