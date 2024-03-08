/* eslint-disable react/prop-types */
// import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
const FormComponent = ({ formik, authFailed, children }) => {
  // console.log(formik.errors, formik.touched)
  return (
    <>
      { authFailed && <div className='text-danger'>the username or password is incorrect</div>}
      { Object.keys(formik.errors).map((key) => <div className='text-danger' key={key}>{formik.errors[key]}</div>)}
      <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0 w-100">
        {children}
        <Form.Control.Feedback type="invalid">{formik.errors.password ? formik.errors.password : ''}</Form.Control.Feedback>
        <Button type="submit" variant="primary" disabled={Object.keys(formik.errors).length}>Зарегистрироваться</Button>
      </Form>
    </>
  )
}

// TODO: доработать валидацию пропсов

// FormComponent.propTypes = { // доработать
//   formik: 'object',
//   handleFocus: 'function',
//   authFailed: 'boolean'
// }

export default FormComponent
