/* eslint-disable react/prop-types */
import { useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Modal, FormControl, Form, Button, FormGroup
} from 'react-bootstrap'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import filter from 'leo-profanity'
import { addChannel, selectors } from '../../slices/channelsSlice'

// #TODO добавить показ ошибки в форме
const Add = ({ onHide }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const inputRef = useRef()
  const channels = useSelector(selectors.selectAll)

  useEffect(() => inputRef.current.focus(), [])

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .notOneOf(channels.map(({ name }) => name))
      .min(2, t('messages.errors.channelNameLength')) // #TODO ошибки должны заполняться текстами
      .max(20, t('messages.errors.channelNameLength'))
      .required(t('messages.errors.required'))
  })

  const f = useFormik({
    initialValues: {
      name: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      filter.loadDictionary('en')
      const filteredEn = filter.clean(values.name)
      filter.loadDictionary('ru')
      const filteredRu = filter.clean(filteredEn)
      await toast.promise(
        dispatch(addChannel({ name: filteredRu })).unwrap(),
        {
          pending: `${t('messages.info')}`,
          success: `${t('messages.success.channelAdded')}`,
          error: `${t('messages.errors.channelName')}`
        }
      )
      onHide()
      f.resetForm()
    }
  })

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>{t('modal.add.title')}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={f.handleSubmit}>
          <FormGroup className="form-floating mb-3">
            <FormControl
              required
              ref={inputRef}
              onChange={f.handleChange}
              onBlur={f.handleBlur}
              value={f.values.name}
              data-testid="input-name"
              name="name"
              id="add"
              isInvalid={f.errors.name}
              placeholder={t('modal.add.placeholder')}
            />
            <Form.Control.Feedback tooltip type="invalid">{f.errors.name}</Form.Control.Feedback>
            <Form.Label htmlFor="add">{t('modal.add.placeholder')}</Form.Label>
            <Button type="submit" className="btn btn-primary" disabled={f.errors.name}>{t('modal.add.submit')}</Button>
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default Add
