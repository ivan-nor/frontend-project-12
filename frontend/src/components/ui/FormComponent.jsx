/* eslint-disable react/prop-types */
import { useTranslation } from 'react-i18next'
import { Form, Button } from 'react-bootstrap'

const FormComponent = ({ formik, children, error, name }) => {
  const { t } = useTranslation()

  return (
    <>
      {/* { error && <div className='text-danger'>{error.message}</div> } */}

      {/* { Object.keys(formik.errors).map((key) => <div className='text-danger' key={key}>{formik.errors[key]}</div>)} */}

      <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
        <h1 className='text-center mb-4'>{t(`${name}.title`)}</h1>
        {children}
        <Button type="submit" variant="primary" disabled={Object.keys(formik.errors).length}>
          {t(`${name}.submit`)}
        </Button>
      </Form>
    </>
  )
}

// #TODO доработать валидацию пропсов

// FormComponent.propTypes = { // доработать
//   formik: 'object',
//   handleFocus: 'function',
//   authFailed: 'boolean'
// }

export default FormComponent
