/* eslint-disable react/prop-types */
import { Modal, FormGroup, Form, FormControl } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { removeChannel } from '../../slices/channelsSlice'
import { useFormik } from 'formik'
import { useRef } from 'react'
import { useKey } from 'react-use'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const Remove = ({ onHide, channel }) => {
  const dispatch = useDispatch()
  const ref = useRef()
  const { t } = useTranslation()

  const handleSubmit = async () => {
    await toast.promise(
      dispatch(removeChannel({ id: channel.id })).unwrap(),
      {
        pending: `${t('messages.info')}`,
        success: `${t('messages.success.channelRemoved')}`,
        error: `${t('messages.errors.network')}`
      }
    )
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
              <FormControl
                as='button'
                name='submit'
                type="submit"
                className="btn btn-danger mt-2"
                onBlur={f.handleBlur}
                onChange={f.handleChange}
                style={{ outline: 0 }}
              >
                {t('modal.remove.submit')}
              </FormControl>
            </FormGroup>
          </Form>
        </Modal.Body>
      </Modal>
  )
}

export default Remove
