/* eslint-disable react/prop-types */
import { Container, Row, Col, Card, Image } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import getImages from '../../assets/images/images'
import { useEffect } from 'react'

const AuthForm = ({ name, children }) => {
  const { t } = useTranslation()
  const image = getImages(name)
  const isShowFooter = (name === 'login')

  // useEffect(() => console.log((`/${${name}.footer.link`)))

  return (
    <Container fluid={true}>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={10} lg={8} xs={12}>
          <Card className="shadow">
            <Card.Header className=''>{t(`${name}.title`)}</Card.Header>
            <Card.Body className="d-flex flex-column flex-md-row justify-content-between align-items-center p-5">
              <Image src={image} alt={`${name} image`} roundedCircle/>
              <div>
                {children}
              </div>
            </Card.Body>
            { isShowFooter &&
              <Card.Footer className='p-4'>
                <div className='text-center'>
                  <span>{t(`${name}.footer.label`)}</span>
                  <Link to={`/${t(`${name}.footer.link`)}`}>
                    <span>{t(`${name}.footer.title`)}</span>
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
