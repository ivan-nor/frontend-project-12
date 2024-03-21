/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import { createUser, selectors as usersSelectors } from '../../slices/usersSlice'
import useAuth from '../../hooks'
import AuthForm from '../ui/AuthForm'
import FormComponent from '../ui/FormComponent'
import InputComponent from '../ui/InputComponent'
import { useTranslation } from 'react-i18next'

const SignupPage = () => {
  // const [signupFailed, setSignupFailed] = useState(null) // #TODO изменить этот флаг на formik.isValid чтобы убрать лишний пропс
  const [touched, setTouched] = useState('')
  const signupError = useSelector(state => state.users.error)

  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const auth = useAuth()
  const { t } = useTranslation()

  useEffect(() => { // проверка на залогированность
    // console.log('LOGIN', localStorage, location, location.state, auth)
    if (auth.loggedIn) {
      navigate('/')
    }
  }, [])

  // useEffect(() => console.log('SIGNUP ERROR', signupError), [signupError])

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
      .required('Please re-type your password')
      .oneOf([Yup.ref('password')], 'Пароли должны совпадать')
  })

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      // setSignupFailed(false)
      try {
        const response = await toast.promise(
          dispatch(createUser(values)).unwrap(),
          {
            pending: `${t('messages.info')}`,
            success: `${t('messages.success.signup')}`,
            error: `${t('messages.errors.signup')}`
          }
        )

        navigate('/login')
      } catch (err) {
        console.log('disp catch', err)
      }
    }
  })

  const handleFocus = (e) => { // очистка формы при вводе после неуспешной авторизации
    // console.log('FOCUS', e.target.name)

    // setTouched(e.target.name)

    if (signupError) {
      // setSignupFailed(false)
      // setTouched('')
      // formik.resetForm()
    }
  }

  // TODO исправить показ ошибки только по конкретному полю и сброс формы если все значения пусты
  const handleBlur = (e) => {
    // console.log('blur', e, formik.errors, formik.touched, formik.values)
    // if (Object.keys(formik.errors).length === 0) {
    //   formik.resetForm()
    // } else {
    formik.handleBlur(e)
    // }
  }

  const handleChange = (e) => { // добавить отрисовку ошибки только конкретного поля
    // console.log('CHANGE', e.target.name, formik.errors, Object.values(formik.values), Object.values(formik.values).join())
    formik.handleChange(e)
    if (Object.values(formik.values).join().length === 0) {
      // setTouched('')
      // formik.resetForm()
    }
  }

  // useEffect(() => console.log('TOUCHED', touched), [touched])

  return (
    <AuthForm isShowFooter={false} name={'signup'}>
      <FormComponent
        formik={formik}
        handleFocus={handleFocus}
        error={signupError}
        name={'signup'}
      >
        <InputComponent
          name={'username'}
          type={'signup'}
          value={formik.values.username}
          handleChange={(e) => handleChange(e)}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          isInvalid={formik.errors.username}
        />
        <InputComponent
          name={'password'}
          type={'signup'}
          value={formik.values.password}
          handleChange={(e) => handleChange(e)}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          isInvalid={formik.errors.password}
        />
        <InputComponent
          name={'confirmPassword'}
          type={'signup'}
          value={formik.values.confirmPassword}
          handleChange={(e) => handleChange(e)}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          isInvalid={formik.errors.confirmPassword}
        />
      </FormComponent>
    </AuthForm>
  )
}

export default SignupPage
