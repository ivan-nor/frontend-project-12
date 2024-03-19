/* eslint-disable react/prop-types */
import { Modal, FormGroup, Form, FormControl } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { removeChannel } from '../../slices/channelsSlice'
import { useFormik } from 'formik'
import { useRef } from 'react'
import { useKey } from 'react-use'
import { useTranslation } from 'react-i18next'

const Remove = ({ onHide, channel }) => {
  const dispatch = useDispatch()
  const ref = useRef()
  const { t } = useTranslation()

  const handleSubmit = () => {
    dispatch(removeChannel({ id: channel.id }))
    onHide()
  }

  useKey((e) => e.key === 'Enter', handleSubmit, { event: 'keyup' })

  const f = useFormik({
    onSubmit: handleSubmit,
    initialValues: {}
  })

  return (
      <Modal show onHide={onHide}>
        <Modal.Header closeButton onHide={onHide}>
          <Modal.Title>{t('modal.remove.title')}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form
            onSubmit={f.handleSubmit}
            ref={ref}
          >
            <FormGroup>
              <FormControl name='submit' type="submit" className="btn btn-danger mt-2" value={t('modal.remove.submit')} onBlur={f.handleBlur} onChange={f.handleChange} />
            </FormGroup>
          </Form>
        </Modal.Body>
      </Modal>
  )
}

export default Remove
