/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Modal, FormGroup, FormControl, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { editChannel, selectors } from '../../slices/channelsSlice'

const Rename = (props) => {
  const { onHide, channel } = props
  const dispatch = useDispatch()
  const inputRef = useRef()
  const channels = useSelector(selectors.selectAll)

  useEffect(() => {
    inputRef.current.select()
  }, [])

  useEffect(() => console.log(channels), [channels])

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .notOneOf(channels.map(({ name }) => name))
      .min(2, 'Минимум 2 буквы')
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
              isInvalid={f.errors.name}
            />
            <FormControl type="submit" className="btn btn-primary mt-2" value="submit" />
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default Rename
