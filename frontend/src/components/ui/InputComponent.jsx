/* eslint-disable react/prop-types */
import { useTranslation } from 'react-i18next'
import { Form, Row, Col, FloatingLabel } from 'react-bootstrap'

const InputComponent = ({ name, value, handleChange, handleFocus, isInvalid, handleBlur, type }) => {
  const { t } = useTranslation()

  return (
    <Row className='mb-3'>
      <Form.Group as={Col} className="position-relative">
        <FloatingLabel controlId={name} label={t(`${type}.${name}`)}>
          <Form.Control
            onFocus={handleFocus}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={isInvalid}

            // type={name.toLowerCase().includes('password') ? 'password' : 'text'} // #TODO тип поля чтобы скрывать ввод пароля, на будущее
            className='d-block'
            value={value}
            placeholder={t(`${type}.${name}`)}
            name={name}
            id={name}

            autoComplete={name}
            required
          />
          <Form.Control.Feedback tooltip type='invalid'>{t(`messages.errors.${name}`)}</Form.Control.Feedback>
        </FloatingLabel>
      </Form.Group>
    </Row>
  )
}

// TODO: доработать ваоидацию пропсов

// InputComponent.propTypes = {
//   name: 'string',
//   value: 'string',
//   isInvalid: Boolean,
//   handleChange: 'function',
//   handleFocus: 'function'
// }

export default InputComponent
