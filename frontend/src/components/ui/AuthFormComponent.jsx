/* eslint-disable react/prop-types */
import {
  Container, Row, Col, Card, Image, Form, Button,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import getImages from '../../assets/images/images';
// import { useEffect } from 'react'

const AuthFormComponent = ({ name, children, formik }) => {
  const { t } = useTranslation();
  const image = getImages(name);
  const isShowFooter = (name === 'login');

  return (
    <Container fluid className="vh-100">
      <Row className="h-100 justify-content-center align-items-center">
        <Col md={10} lg={8} xs={12} xxl={6}>
          <Card className="shadow">
            <Card.Header className="">{t(`${name}.title`)}</Card.Header>
            <Card.Body className="p-5">
              <Row>
                <Col className="d-flex align-items-center justify-content-center" md={6} sm={12}>
                  <Image src={image} alt={`${name} image`} roundedCircle />
                </Col>
                <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                  <h1 className="text-center mb-4">{t(`${name}.title`)}</h1>
                  {children}
                  <Button
                    type="submit"
                    // variant="primary"
                    // disabled={Object.keys(formik.errors).length}
                  >
                    {t(`${name}.submit`)}
                  </Button>
                </Form>
              </Row>
            </Card.Body>

            { isShowFooter
              && (
              <Card.Footer className="p-4">
                <div className="text-center">
                  <span>{t(`${name}.footer.label`)}</span>
                  <Link to={`/${t(`${name}.footer.link`)}`}>
                    {t(`${name}.footer.title`)}
                  </Link>
                </div>
              </Card.Footer>
              )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthFormComponent;
