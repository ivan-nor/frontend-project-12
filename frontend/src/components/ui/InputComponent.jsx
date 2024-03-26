/* eslint-disable react/prop-types */
import { useTranslation } from 'react-i18next'
import { Form, FloatingLabel } from 'react-bootstrap'

const InputComponent = ({ name, value, handleChange, handleFocus, isInvalid, handleBlur, type, error }) => {
  const { t } = useTranslation()

  return (
        <FloatingLabel label={t(`${type}.${name}`)} htmlFor={name} className='mb-3'>
          <Form.Control
            onFocus={handleFocus}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={isInvalid}

            // type={name.toLowerCase().includes('password') ? 'password' : 'text'} // #TODO тип поля чтобы скрывать ввод пароля, на будущее
            className='d-block'
            value={value}
            placeholder={t(`${type}.${name}`)}
            // name={t(`${type}.${name}`)}
            id={name}

            autoComplete={name}
            required
          />
          <Form.Control.Feedback tooltip type='invalid'>{error}</Form.Control.Feedback>
        </FloatingLabel>
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
