/* eslint-disable react/prop-types */
// import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import InputComponent from './InputComponent'

const FormComponent = ({ formik, handleFocus, authFailed }) => {
  return (
    <>
      <div className='text-danger'>{authFailed ? 'the username or password is incorrect' : ''}</div>
      <Form onSubmit={formik.handleSubmit} className="p-3" name="form">
        <fieldset>
          <Form.Group className='position-relative'>
            <Form.Label htmlFor="username">Username</Form.Label>
            <InputComponent
              name={'username'}
              isInvalid={formik.errors.username || authFailed}
              value={formik.values.username}
              handleFocus={handleFocus}
              handleChange={formik.handleChange}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.username ? formik.errors.username : null}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="password">Password</Form.Label>
            <InputComponent
              name={'password'}
              handleFocus={handleFocus}
              handleChange={formik.handleChange}
              value={formik.values.password}
              isInvalid={formik.errors.password || authFailed}
            />
            <Form.Control.Feedback type="invalid">{formik.errors.password ? formik.errors.password : ''}</Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" variant="outline-primary">Submit</Button>
        </fieldset>
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
