/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Form, Button, InputGroup } from 'react-bootstrap'
// import { useDispatch } from 'react-redux'
// import { addMessage } from '../../slices/messagesSlice'

const InputMessageComponent = ({ handleSubmit }) => {
  const [value, setValue] = useState('')

  const handleChange = (e) => setValue(e.target.value)

  const handleSubmitInForm = (e) => {
    e.preventDefault()
    handleSubmit(value)
    setValue('')
  }

  return (
      <Form name='inputMessage' onSubmit={handleSubmitInForm} className='p-2 align-content-end'>
        <InputGroup>
          <Form.Control
            type='text'
            value={value}
            onChange={handleChange}
            placeholder='введите сообщение'
            className='d-inline'
          />
          <Button type='submit' className='d-inline'>Отправить</Button>
        </InputGroup>
      </Form>
  )
}

export default InputMessageComponent
