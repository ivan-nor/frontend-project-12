/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import useAuth from '../../hooks'
import Signup from '../ui/Signup'
import FormComponent from '../ui/FormComponent'
import InputComponent from '../ui/InputComponent'

const SignupPage = () => {
  const [authFailed, setAuthFailed] = useState(false) // изменить этот флаг на formik.isValid чтобы убрать лишний пропс
  const [touched, setTouched] = useState('')

  const location = useLocation()
  const navigate = useNavigate()
  const auth = useAuth()

  useEffect(() => { // проверка на залогированность
    // console.log('LOGIN', localStorage, location, location.state, auth)
    if (auth.loggedIn) {
      navigate('/')
    }
  }, [])

  const SignupSchema = Yup.object().shape({ // добавить проверку одинаковых паролей
    username: Yup.string()
      .min(2, 'Минимум 2 буквы')
      .max(10, 'Максимум 10 букв')
      .required('Обязательное поле'),
    password: Yup.string()
      .min(2, 'Минимум 2 буквы')
      .max(10, 'Максимум 10 букв')
      .required('Обязательное поле'),
    confirmPassword: Yup.string()
      .min(2, 'Минимум 2 буквы')
      .max(10, 'Максимум 10 букв')
      .required('Please re-type your password')
      .oneOf([Yup.ref('password')], 'Passwords do not match')
  })

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => { // тут метод регисрации должен быть
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
          setTouched('')
          return
        }
        throw err
      }
    }
  })

  const handleFocus = (e) => { // очистка формы при вводе после неуспешной авторизации
    // console.log('FOCUS', e.target.name)

    setTouched(e.target.name)

    if (authFailed) {
      setAuthFailed(false)
      setTouched('')
      formik.resetForm()
    }
  }

  // TODO исправить показ ошибки только по конкретному полю и сброс формы если все значения пусты
  const handleBlur = (e) => {
    console.log('blur', e, formik.errors, formik.touched, formik.values)
    // if (Object.keys(formik.errors).length === 0) {
    //   formik.resetForm()
    // } else {
    formik.handleBlur(e)
    // }
  }

  const handleChange = (e) => { // добавить отрисовку ошибки только конкретного поля
    console.log('CHANGE', e.target.name, touched, formik.errors, Object.values(formik.values).join())
    formik.handleChange(e)
    if (Object.values(formik.values).join().length === 0) {
      setTouched('')
      formik.resetForm()
    }
  }

  useEffect(() => console.log('TOUCHED', touched), [touched])

  return (
    <Signup isShowFooter={false}>
      <FormComponent
        formik={formik}
        handleFocus={handleFocus}
        authFailed={authFailed}
      >
        <InputComponent
          name={'username'}
          value={formik.values.username}
          handleChange={(e) => handleChange(e)}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          isInvalid={formik.errors[touched] || authFailed}
        />
        <InputComponent
          name={'password'}
          value={formik.values.password}
          handleChange={(e) => handleChange(e)}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          isInvalid={(formik.errors.password && formik.touched.password) || authFailed}
        />
        <InputComponent
          name={'confirmPassword'}
          value={formik.values.confirmPassword}
          handleChange={(e) => handleChange(e)}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          isInvalid={(formik.errors.confirmPassword & formik.touched.confirmPassword) || authFailed}
        />
      </FormComponent>
    </Signup>
  )
}

export default SignupPage
