/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Modal, FormGroup, FormControl, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { editChannel } from '../../slices/channelsSlice'

const Rename = (props) => {
  const { onHide, channel } = props
  const dispatch = useDispatch()
  const inputRef = useRef()

  useEffect(() => {
    inputRef.current.select()
  }, [])

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(1, 'Минимум 1 буква')
      .max(20, 'Максимум 20 букв')
      .required('Обязательное поле')
  })

  const f = useFormik({
    onSubmit: (values) => {
      dispatch(editChannel({ name: values.name, id: channel.id }))
      onHide()
    },
    validationSchema, // #TODO добавить валидацию имен канала (не повторяются)
    initialValues: {
      name: channel.name
    }
  })

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Rename</Modal.Title>
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
            />
            <FormControl type="submit" className="btn btn-primary mt-2" value="submit" />
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default Rename
