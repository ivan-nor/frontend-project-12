/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import useAuth from '../../hooks'
import FormComponent from '../ui/FormComponent'

const LoginPage = () => {
  const [authFailed, setAuthFailed] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const auth = useAuth()

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
    <FormComponent
      formik={formik}
      handleFocus={handleFocus}
      authFailed={authFailed}
    />
  )
}

export default LoginPage
