/* eslint-disable react/prop-types */
import { Modal, FormGroup, Form, FormControl } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { removeChannel } from '../../slices/channelsSlice'
import { useFormik } from 'formik'
import { useRef } from 'react'
import { useKey } from 'react-use'

const Remove = (props) => {
  const { onHide, channel } = props
  const dispatch = useDispatch()
  const ref = useRef()

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
          <Modal.Title>Remove</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form
            onSubmit={f.handleSubmit}
            ref={ref}
          >
            <FormGroup>
              <FormControl name='submit' type="submit" className="btn btn-danger mt-2" value="remove" onBlur={f.handleBlur} onChange={f.handleChange} />
            </FormGroup>
          </Form>
        </Modal.Body>
      </Modal>
  )
}

export default Remove
