/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
// import {
//   Container, Row, Col, Card, Image, Form, Button,
// } from 'react-bootstrap';
import {
  MDBCard,
  MDBCardTitle,
  MDBCardText,
  MDBCardBody,
  MDBCardHeader,
  MDBContainer,
  MDBCardFooter,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBBtn
} from 'mdb-react-ui-kit'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import getImages from '../../assets/images/images'
// import { useEffect } from 'react'

const AuthFormComponent = ({ name, children, formik }) => {
  const { t } = useTranslation()
  const image = getImages(name)
  const isShowFooter = (name === 'login')

  return (
    <MDBContainer fluid className="vh-100">
      <MDBRow className="h-100 justify-content-center align-items-center">
        <MDBCol md={10} lg={8} xs={12} xxl={6}>
          <MDBCard className="shadow mb-3" background='light'>
            <MDBCardHeader className="">{t(`${name}.title`)}</MDBCardHeader>
            <MDBCardBody className="p-5">
              <MDBRow>
                <MDBCol className="d-flex align-items-center justify-content-center" md={6} sm={12}>
                  <MDBCardImage src={image} alt={`${name} image`} className='rounded-circle' />
                </MDBCol>
                <form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                  <MDBCardTitle className="text-center mb-4 fs-1">{t(`${name}.title`)}</MDBCardTitle>
                  {children}
                  <MDBBtn
                    type="submit"
                    // variant="primary"
                    // disabled={Object.keys(formik.errors).length}
                  >
                    {t(`${name}.submit`)}
                  </MDBBtn>
                </form>
              </MDBRow>
            </MDBCardBody>

            { isShowFooter &&
              (
              <MDBCardFooter className="p-4">
                <div className="text-center">
                  <span>{t(`${name}.footer.label`)}</span>
                  <Link to={`/${t(`${name}.footer.link`)}`}>
                    {t(`${name}.footer.title`)}
                  </Link>
                </div>
              </MDBCardFooter>
              )}
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

export default AuthFormComponent
