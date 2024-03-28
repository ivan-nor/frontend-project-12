/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import useAuth from '../../hooks';
import { loginUser } from '../../slices/usersSlice';
import AuthFormComponent from '../ui/AuthFormComponent';
import InputComponent from '../ui/InputComponent';

const LoginPage = () => {
  const [authFailed, setAuthFailed] = useState(false); // #TODO убрать лишний пропс
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const auth = useAuth();
  const loginError = useSelector((state) => state.users.error);

  useEffect(() => { // проверка на залогированность
    if (auth.loggedIn) {
      navigate('/');
    }
  }, []);

  const loginSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, t('messages.errors.username'))
      .max(10, t('messages.errors.username'))
      .required(t('messages.errors.required')),
    password: Yup.string()
      .min(2, t('messages.errors.passwordMin'))
      .max(10, t('messages.errors.password'))
      .required('Обязательное поле'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setAuthFailed(false);

      try {
        const response = await toast.promise(
          dispatch(loginUser(values)).unwrap(),
          {
            pending: `${t('messages.info')}`,
            success: `${t('messages.success.login')}`,
            error: `${t('messages.errors.login')}`,
          },
        );

        localStorage.setItem('userId', JSON.stringify(response));
        auth.logIn();
        navigate('/');
      } catch (err) {
        console.log('LOGIN err', err);
        // formik.setSubmitting(false)
      }
    },
  });

  const handleFocus = () => { // очистка формы при вводе после неуспешной авторизации
    if (authFailed) {
      setAuthFailed(false);
      formik.resetForm();
    }
  };

  const handleChange = (e) => {
    // console.log(e, formik.values)
    formik.handleChange(e);
  };

  return (
    <AuthFormComponent name="login" isShowFooter={false} formik={formik}>
      <InputComponent
        name="username"
        type="login"
        value={formik.values.username}
        handleChange={handleChange}
        handleFocus={handleFocus}
        isInvalid={formik.errors.username && formik.touched.username}
        error={formik.errors.username}
      />
      <InputComponent
        name="password"
        type="login"
        value={formik.values.password}
        handleChange={handleChange}
        handleFocus={handleFocus}
        isInvalid={formik.errors.password && formik.touched.password}
        error={formik.errors.password}
      />
    </AuthFormComponent>
  );
};

export default LoginPage;
