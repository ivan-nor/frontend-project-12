/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, FormGroup, FormControl, Form } from 'react-bootstrap'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { addChannel, selectors } from '../../slices/channelsSlice'
import { useTranslation } from 'react-i18next'

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
      .min(2, 'Минимум 2 буквы') // #TODO ошибки должны заполняться текстами
      .max(20, 'Максимум 20 букв')
      .required('Обязательное поле')
  })

  const f = useFormik({
    initialValues: {
      name: ''
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(addChannel({ name: values.name }))
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
              placeholder={t('modal.add.placeholder')}
            />
          </FormGroup>
          <input type="submit" className="btn btn-primary mt-2" value={t('modal.add.submit')} disabled={f.errors.name}/>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default Add
