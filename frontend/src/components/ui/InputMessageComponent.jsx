import { useState } from 'react'
import { Form, Button, InputGroup } from 'react-bootstrap'

const InputMessageComponent = () => {
  const [value, setValue] = useState('')

  const handleSubmit = (e) => { // dispatch(sendMessage(value))
    e.preventDefault()
    console.log('SEND MESSAGE', value)
    setValue('')
  }

  return (
      <Form name='inputMessage' onSubmit={handleSubmit} className='p-2 align-content-end'>
        <InputGroup>
          <Form.Control
            type='text'
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder='введите сообщение'
            className='d-inline'
          />
          <Button type='submit' inline>отправить</Button>
        </InputGroup>
      </Form>
  )
}

export default InputMessageComponent
