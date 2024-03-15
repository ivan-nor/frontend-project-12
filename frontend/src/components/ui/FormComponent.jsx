/* eslint-disable react/prop-types */
import { Form, Button } from 'react-bootstrap'

const FormComponent = ({ formik, children, error }) => (
  <>
    { error && <div className='text-danger'>{error.message}</div>}

    { Object.keys(formik.errors).map((key) => <div className='text-danger' key={key}>{formik.errors[key]}</div>)}

    <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0 w-100">
      {children}
      <Button type="submit" variant="primary" disabled={Object.keys(formik.errors).length}>Done</Button>
    </Form>
  </>
)

// #TODO доработать валидацию пропсов

// FormComponent.propTypes = { // доработать
//   formik: 'object',
//   handleFocus: 'function',
//   authFailed: 'boolean'
// }

export default FormComponent
