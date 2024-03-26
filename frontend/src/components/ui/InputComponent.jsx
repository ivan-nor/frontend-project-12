/* eslint-disable react/prop-types */
import { useTranslation } from 'react-i18next'
import { Form } from 'react-bootstrap'

// #TODO переименовать в AuthInput
const InputComponent = ({ name, value, handleChange, handleFocus, isInvalid, handleBlur, type, error }) => {
  const { t } = useTranslation()

  return (
    <Form.Group className="form-floating mb-3">
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
      <Form.Label htmlFor={name}>{t(`${type}.${name}`)}</Form.Label>
      <Form.Control.Feedback tooltip type='invalid'>{error}</Form.Control.Feedback>
    </Form.Group>
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
