/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react'
import { useFormik } from 'formik'
import { Modal, FormGroup, FormControl } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { editChannel } from '../../slices/channelsSlice'

const Rename = (props) => {
  const { onHide, channel } = props
  const dispatch = useDispatch()
  const inputRef = useRef()

  useEffect(() => {
    inputRef.current.select()
  }, [])

  const f = useFormik({
    onSubmit: (values) => {
      dispatch(editChannel({ name: values.name, id: channel.id }))
      onHide()
    },
    initialValues: {
      name: channel.name
    }
  })

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Rename</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={f.handleSubmit}>
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
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default Rename
