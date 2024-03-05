/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { useFormik, ErrorMessage, Field, FormikProvider } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import useAuth from '../hooks'

const LoginPage = () => {
  const [authFailed, setAuthFailed] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const auth = useAuth()
  const inputRef = useRef()
  // useEffect(() => { // ФОКУС на инпуте при монтировании
  //   inputRef.current.focus()
  // }, [])
  useEffect(() => { // проверка на залогированность
    console.log('LOGIN', localStorage, location, location.state, auth)
    if (auth.loggedIn) {
      navigate('/')
    }
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
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      // console.log(JSON.stringify(values, null, 2))
      setAuthFailed(false)

      try {
        const response = await axios.post('/api/v1/login', values)
        localStorage.setItem('userId', JSON.stringify(response.data))
        console.log('LOGIN response', response, response.data)
        // console.log('LOGIN location', location, location.state)
        auth.logIn()
        const { from } = location.state
        navigate(from)
      } catch (err) {
        formik.setSubmitting(false)
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true)
          // inputRef.current.select() // выделение и фокус на инпуте после ошибки
          return
        }
        throw err
      }
    }
  })

  const handleFocus = () => { // очистка формы при вводе после неуспешной авторизации
    if (authFailed) {
      setAuthFailed(false)
      formik.resetForm()
    }
  }

  return (
    <div className="container-fluid">
      <div className="row justify-content-center pt-5">
        <div className="col-sm-4">
        <div className='text-danger'>{authFailed ? 'the username or password is incorrect' : ''}</div>
          <Form onSubmit={formik.handleSubmit} className="p-3" name="form">
            <fieldset>
              <Form.Group className='position-relative'>
                <Form.Label htmlFor="username">Username</Form.Label>
                <Form.Control
                  onFocus={handleFocus}
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  placeholder="username"
                  name="username"
                  id="username"
                  autoComplete="username"
                  isInvalid={formik.errors.username || authFailed}
                  required
                  ref={inputRef}
                />
                <Form.Control.Feedback type="invalid">{formik.errors.username ? formik.errors.username : null}</Form.Control.Feedback>
                {/* <div className="invalid-tooltip">{formik.errors.username ? formik.errors.username : null}</div> */}
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control
                  type="password"
                  onFocus={handleFocus}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  placeholder="password"
                  name="password"
                  id="password"
                  autoComplete="current-password"
                  isInvalid={formik.errors.password || authFailed}
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

export default LoginPage
