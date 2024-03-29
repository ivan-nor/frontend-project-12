/* eslint-disable react/prop-types */
import { useState } from 'react'
// import { Form, Button, InputGroup } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import filter from 'leo-profanity'
import { MDBInputGroup, MDBRow, MDBBtn } from 'mdb-react-ui-kit'

const MessageInput = ({ handleSendMessage }) => {
  const { t } = useTranslation()
  const [value, setValue] = useState('')

  const handleChange = (e) => setValue(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value !== '') {
      filter.loadDictionary('en')
      const filteredEn = filter.clean(value)
      filter.loadDictionary('ru')
      const filteredRu = filter.clean(filteredEn)
      handleSendMessage(filteredRu)
      setValue('')
    }
  }

  return (
    <div className="mt-auto px-5 py-3">
      {/* <form name="inputMessage" onSubmit={handleSubmit}> */}
      <MDBRow tag='form' className='row-cols-lg-auto g-3 align-items-center' onSubmit={handleSubmit}>
        <MDBInputGroup className='mb-3'>
          <input
            className='form-control'
            placeholder={t('message.placeholder')}
            type='text'
            onChange={handleChange}
            value={value}
            id={t('message.label')}
            aria-label={t('message.label')}
          />
          <MDBBtn outline type="submit">{t('message.submit')}</MDBBtn>
        </MDBInputGroup>

          {/* <Form.Control
            type="text"
            value={value}
            onChange={handleChange}
            placeholder={t('message.placeholder')}
            className="d-inline"
            id={t('message.label')}
            aria-label={t('message.label')}
          />
          <Button type="submit" className="d-inline">{t('message.submit')}</Button> */}
      </MDBRow>
      {/* </form> */}
    </div>
  )
}

export default MessageInput
