/* eslint-disable react/prop-types */
// import React from 'react'
import { Form, FloatingLabel } from 'react-bootstrap'

const InputComponent = ({ name, value, handleChange, handleFocus, isInvalid, handleBlur }) => (
  <FloatingLabel htmlFor={name} className='mb-3'>
    <Form.Control
      onFocus={handleFocus}
      onChange={handleChange}
      onBlur={handleBlur}
      isInvalid={isInvalid}

      // type={name.toLowerCase().includes('password') ? 'password' : 'text'} // тип поля чтобы скрывать ввод пароля, на будущее
      className='d-block'
      value={value}
      placeholder={name}
      name={name}
      id={name}

      autoComplete={name}
      required
    />
  </FloatingLabel>
)

// TODO: доработать ваоидацию пропсов

// InputComponent.propTypes = {
//   name: 'string',
//   value: 'string',
//   isInvalid: Boolean,
//   handleChange: 'function',
//   handleFocus: 'function'
// }

export default InputComponent
