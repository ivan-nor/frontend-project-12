/* eslint-disable react/prop-types */
// import { useState } from 'react'
import { Form, Button, FloatingLabel } from 'react-bootstrap'
import InputComponent from './InputComponent'

const FormComponent = ({ formik, handleFocus, authFailed }) => {
  return (
    <>
      <div className='text-danger'>{authFailed ? 'the username or password is incorrect' : ''}</div>
      <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
            <FloatingLabel htmlFor="username" label='Username' className='mb-3'>
              <InputComponent
                name={'username'}
                isInvalid={formik.errors.username || authFailed}
                value={formik.values.username}
                handleFocus={handleFocus}
                handleChange={formik.handleChange}
              />
              <Form.Control.Feedback type="invalid">{formik.errors.username ? formik.errors.username : null}</Form.Control.Feedback>
            </FloatingLabel>
            <FloatingLabel label='Password' htmlFor="password" className='mb-4'>
              <InputComponent
                name={'password'}
                handleFocus={handleFocus}
                handleChange={formik.handleChange}
                value={formik.values.password}
                isInvalid={formik.errors.password || authFailed}
              />
              <Form.Control.Feedback type="invalid">{formik.errors.password ? formik.errors.password : ''}</Form.Control.Feedback>
            </FloatingLabel>
          <Button type="submit" variant="outline-primary">Submit</Button>
      </Form>
    </>
  )
}

// TODO: доработать ваоидацию пропсов

// FormComponent.propTypes = { // доработать
//   formik: 'object',
//   handleFocus: 'function',
//   authFailed: 'boolean'
// }

export default FormComponent
