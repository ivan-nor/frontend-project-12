/* eslint-disable react/prop-types */
import { Modal, FormGroup } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { removeChannel } from '../../slices/channelsSlice'

const Remove = (props) => {
  const { onHide, channel } = props
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(removeChannel({ id: channel.id }))
    onHide()
  }

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Remove</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <input type="submit" className="btn btn-danger mt-2" value="remove" />
          </FormGroup>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default Remove
