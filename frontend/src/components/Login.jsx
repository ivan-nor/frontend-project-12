/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useFormik, ErrorMessage } from 'formik'
import * as Yup from 'yup'

const Login = () => {
  const [authFailed, setAuthFailed] = useState(null)
  const inputRef = useRef()
  useEffect(() => {
    inputRef.current.focus()
  }, [])

  const SignupSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, 'Минимум 2 буквы')
      .max(10, 'Максимум 10 букв')
      .required('Обязательное поле'),
    password: Yup.string()
      .min(2, 'Минимум 2 буквы')
      .max(10, 'Максимум 10 букв')
      .required('Обязательное поле')
  })

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: async (values) => {
      console.log(JSON.stringify(values, null, 2))
      setAuthFailed(false)
    },
    validationSchema: SignupSchema
  })

  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col-sm-4">
          <Form onSubmit={formik.handleSubmit} className="p-3">
            <fieldset>
              <Form.Group>
                <Form.Label htmlFor="username">Username</Form.Label>
                <Form.Control
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  placeholder="username"
                  name="username"
                  id="username"
                  autoComplete="username"
                  isInvalid={formik.errors.username}
                  required
                  ref={inputRef}
                />
                <Form.Control.Feedback type="invalid">{formik.errors.username ? formik.errors.username : ''}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  placeholder="password"
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  isInvalid={formik.errors.password}
                  required
                />
                <Form.Control.Feedback type="invalid">{formik.errors.password ? formik.errors.password : ''}</Form.Control.Feedback>
              </Form.Group>
              <Button type="submit" variant="outline-primary">Submit</Button>
            </fieldset>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login
