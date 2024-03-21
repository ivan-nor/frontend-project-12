/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, FormGroup, FormControl, Form } from 'react-bootstrap'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import filter from 'leo-profanity'
import { editChannel, selectors } from '../../slices/channelsSlice'

// #TODO добавить показ ошибки в форме
const Rename = ({ onHide, channel }) => {
  const dispatch = useDispatch()
  const inputRef = useRef()
  const channels = useSelector(selectors.selectAll)
  const { t } = useTranslation()

  useEffect(() => {
    inputRef.current.select()
  }, [])

  useEffect(() => console.log(channels), [channels])

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .notOneOf(channels.map(({ name }) => name))
      .min(2, 'Минимум 2 буквы') // #TODO изменить тексты, добавлять их из i18next
      .max(20, 'Максимум 20 букв')
      .required('Обязательное поле')
  })

  const f = useFormik({
    onSubmit: async (values) => {
      const filteredName = filter.clean(values.name)

      await toast.promise(
        dispatch(editChannel({ name: filteredName, id: channel.id })).unwrap(),
        {
          pending: `${t('messages.info')}`,
          success: `${t('messages.success.channelRenamed')}`,
          error: `${t('messages.errors.channelName')}`
        }
      )

      onHide()
    },
    validationSchema,
    initialValues: {
      name: channel.name
    }
  })

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modal.rename.title')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={f.handleSubmit}>
          <FormGroup>
            <FormControl
              required
              ref={inputRef}
              onChange={f.handleChange}
              onBlur={f.handleBlur}
              value={f.values.name}
              data-testid="input-name"
              name="name"
              isInvalid={f.errors.name}
              placeholder={t('modal.rename.placeholder')}
            />
            <FormControl type="submit" className="btn btn-primary mt-2" value={t('modal.rename.submit')} />
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default Rename
