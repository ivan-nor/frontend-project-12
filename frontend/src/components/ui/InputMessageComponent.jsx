/* eslint-disable react/prop-types */
import { useState } from 'react'
import { Form, Button, InputGroup } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import filter from 'leo-profanity'

const InputMessageComponent = ({ handleSendMessage }) => {
  const { t } = useTranslation()
  const [value, setValue] = useState('')

  const handleChange = (e) => setValue(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value !== '') {
      const filtered = filter.clean(value)
      console.log(filtered)
      handleSendMessage(filtered)
      setValue('')
    }
  }

  return (
      <Form name='inputMessage' onSubmit={handleSubmit} className='p-2 align-content-end'>
        <InputGroup>
            <Form.Control
              type='text'
              value={value}
              onChange={handleChange}
              placeholder={t('message.label')}
              className='d-inline'
            />
            <Button type='submit' className='d-inline'>{t('message.submit')}</Button>
        </InputGroup>
      </Form>
  )
}

export default InputMessageComponent
