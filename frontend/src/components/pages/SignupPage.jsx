/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { createUser, selectors as usersSelectors } from '../../slices/usersSlice';
import useAuth from '../../hooks';
import AuthFormComponent from '../ui/AuthFormComponent';
import InputComponent from '../ui/InputComponent';

const SignupPage = () => {
  // const [signupFailed, setSignupFailed] = useState(null) // #TODO убрать лишний пропс
  const [touched, setTouched] = useState('');
  const signupError = useSelector((state) => state.users.error);

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();
  const { t } = useTranslation();

  useEffect(() => { // проверка на залогированность
    // console.log('LOGIN', localStorage, location, location.state, auth)
    if (auth.loggedIn) {
      navigate('/');
    }
  }, []);

  // useEffect(() => console.log('SIGNUP ERROR', signupError), [signupError])

  const SignupSchema = Yup.object().shape({ // добавить проверку одинаковых паролей
    username: Yup.string()
      .min(2, t('messages.errors.username'))
      .max(10, t('messages.errors.username'))
      .required(t('messages.errors.required')),
    password: Yup.string()
      .min(6, t('messages.errors.passwordMin'))
      .max(10, t('messages.errors.username'))
      .required(t('messages.errors.required')),
    confirmPassword: Yup.string()
      .required(t('messages.errors.required'))
      .oneOf([Yup.ref('password')], t('messages.errors.confirmPassword')),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      // setSignupFailed(false)
      console.log('handle submit');
      try {
        const response = await toast.promise(
          dispatch(createUser(values)).unwrap(),
          {
            pending: `${t('messages.info')}`,
            success: `${t('messages.success.signup')}`,
            error: `${t('messages.errors.signup')}`,
          },
        );
        localStorage.setItem('userId', JSON.stringify(response));
        auth.logIn();
        navigate('/');
      } catch (err) {
        console.log('disp catch', err);
      }
    },
  });

  const handleFocus = (e) => { // очистка формы при вводе после неуспешной авторизации
    // console.log('FOCUS', e.target.name)

    // setTouched(e.target.name)

    if (signupError) {
      // setSignupFailed(false)
      // setTouched('')
      // formik.resetForm()
    }
  };

  // #TODO исправить показ ошибки только по конкретному полю и сброс формы если все значения пусты
  const handleBlur = (e) => {
    console.log('blur', e, formik.errors, formik.touched, formik.values);
    // if (Object.keys(formik.errors).length === 0) {
    //   formik.resetForm()
    // } else {
    formik.handleBlur(e);
    // }
  };

  const handleChange = (e) => { // #TODO добавить отрисовку ошибки только конкретного поля
    formik.handleChange(e);
    if (Object.values(formik.values).join().length === 0) {
      // setTouched('')
      // formik.resetForm()
    }
  };

  // useEffect(() => console.log('TOUCHED', touched), [touched])

  return (
    <AuthFormComponent isShowFooter={false} name="signup" formik={formik}>
      <InputComponent
        name="username"
        type="signup"
        value={formik.values.username}
        handleChange={handleChange}
        handleFocus={handleFocus}
        handleBlur={handleBlur}
        isInvalid={formik.errors.username && formik.touched.username}
        error={formik.errors.username}
      />
      <InputComponent
        name="password"
        type="signup"
        value={formik.values.password}
        handleChange={handleChange}
        handleFocus={handleFocus}
        handleBlur={handleBlur}
        isInvalid={formik.errors.password && formik.touched.password}
        error={formik.errors.password}
      />
      <InputComponent
        name="confirmPassword"
        type="signup"
        value={formik.values.confirmPassword}
        handleChange={handleChange}
        handleFocus={handleFocus}
        handleBlur={handleBlur}
        isInvalid={formik.errors.confirmPassword && formik.touched.confirmPassword}
        error={formik.errors.confirmPassword}
      />
    </AuthFormComponent>
  );
};

export default SignupPage;
