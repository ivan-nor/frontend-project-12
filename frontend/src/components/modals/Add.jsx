/* eslint-disable react/prop-types */
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { Modal, FormGroup, FormControl, Form } from 'react-bootstrap'
import { useEffect, useRef } from 'react'
import { addChannel } from '../../slices/channelsSlice'

const Add = (props) => {
  const { onHide } = props
  const dispatch = useDispatch()
  const inputRef = useRef()

  useEffect(() => inputRef.current.focus(), [])

  const f = useFormik({
    initialValues: {
      name: ''
    },
    onSubmit: (values) => {
      dispatch(addChannel({ name: values.name }))
      onHide()
      f.resetForm()
    }
  })

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Add</Modal.Title>
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
          </FormGroup>
          <input type="submit" className="btn btn-primary mt-2" value="submit" />
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default Add
