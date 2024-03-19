/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import useAuth from '../../hooks'
import { loginUser } from '../../slices/usersSlice'
import AuthForm from '../ui/AuthForm'
import FormComponent from '../ui/FormComponent'
import InputComponent from '../ui/InputComponent'

const LoginPage = () => {
  const [authFailed, setAuthFailed] = useState(false) // #TODO изменить этот флаг на formik.isValid чтобы убрать лишний пропс
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const auth = useAuth()
  const loginError = useSelector(state => state.users.error)

  useEffect(() => { // проверка на залогированность
    if (auth.loggedIn) {
      navigate('/')
    }
  }, [])

  const loginSchema = Yup.object().shape({
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
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setAuthFailed(false)

      try {
        const response = await dispatch(loginUser(values)).unwrap()
        localStorage.setItem('userId', JSON.stringify(response))
        auth.logIn()
        navigate('/')
      } catch (err) {
        console.log('LOGIN err', err)
        // formik.setSubmitting(false)
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
    <AuthForm name={'login'} isShowFooter={false}>
      <FormComponent
        formik={formik}
        handleFocus={handleFocus}
        error={loginError}
        name={'login'}
      >
        <InputComponent
          name={'username'}
          value={formik.values.username}
          handleChange={formik.handleChange}
          handleFocus={handleFocus}
          isInvalid={formik.errors.username}
        />
        <InputComponent
          name={'password'}
          value={formik.values.password}
          handleChange={formik.handleChange}
          handleFocus={handleFocus}
          isInvalid={formik.errors.password}
        />
      </FormComponent>
    </AuthForm>
  )
}

export default LoginPage
