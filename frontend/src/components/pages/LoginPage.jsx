/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import useAuth from '../../hooks'
import LoginComponent from '../ui/LoginComponent'
import FormComponent from '../ui/FormComponent'
import InputComponent from '../ui/InputComponent'

const LoginPage = () => {
  const [authFailed, setAuthFailed] = useState(false) // изменить этот флаг на formik.isValid чтобы убрать лишний пропс
  const location = useLocation()
  const navigate = useNavigate()
  const auth = useAuth()

  useEffect(() => { // проверка на залогированность
    // console.log('LOGIN', localStorage, location, location.state, auth)
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
      setAuthFailed(false)

      try {
        const response = await axios.post('/api/v1/login', values)
        localStorage.setItem('userId', JSON.stringify(response.data))
        console.log('LOGIN response', response, response.data)
        auth.logIn()
        const { from } = location.state
        navigate(from)
      } catch (err) {
        formik.setSubmitting(false)
        if (err.isAxiosError && err.response.status === 401) {
          setAuthFailed(true)
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
    <LoginComponent>
      <FormComponent
        formik={formik}
        handleFocus={handleFocus}
        authFailed={authFailed}
      >
        <InputComponent
          name={'username'}
          value={formik.values.username}
          handleChange={formik.handleChange}
          handleFocus={handleFocus}
          isInvalid={formik.errors.username || authFailed}
        />
        <InputComponent
          name={'password'}
          value={formik.values.password}
          handleChange={formik.handleChange}
          handleFocus={handleFocus}
          isInvalid={formik.errors.password || authFailed}
        />
      </FormComponent>
    </LoginComponent>
  )
}

export default LoginPage
