/* eslint-disable react/prop-types */
// import { useState } from 'react'
import { Form, Button, InputGroup } from 'react-bootstrap'
// import { useDispatch } from 'react-redux'
// import { addMessage } from '../../slices/messagesSlice'

const InputMessageComponent = ({ handleChange, handleSubmit, text }) => {
  // const [value, setValue] = useState('')
  // const dispatch = useDispatch()

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   const newMessage = { body: value, channelId: id, username: 'admin' }
  //   console.log('SEND MESSAGE id', id, value)
  //   dispatch(addMessage(newMessage))
  //   setValue('')
  // }

  return (
      <Form name='inputMessage' onSubmit={handleSubmit} className='p-2 align-content-end'>
        <InputGroup>
          <Form.Control
            type='text'
            value={text}
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
