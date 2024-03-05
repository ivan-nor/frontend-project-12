/* eslint-disable react/prop-types */
// import React from 'react'
import { Form } from 'react-bootstrap'

const InputComponent = ({ name, value, handleChange, handleFocus, isInvalid }) => (
  <Form.Control
    onFocus={handleFocus}
    onChange={handleChange}
    isInvalid={isInvalid}

    value={value}
    placeholder={name}
    name={name}
    id={name}

    autoComplete={name}
    required
  />
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
