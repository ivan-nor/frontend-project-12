/* eslint-disable react/prop-types */
import { ListGroup, Col, Button, Dropdown } from 'react-bootstrap'

const getChannelName = ({ removable, name }) => removable ? name : `# ${name}`

const ChannelsComponent = ({ channels, activeId, setActiveId, showModal }) => {
  const handleRenameChannel = (channel) => {
    showModal('renaming', channel)
    setActiveId(channel.id)
  }

  const handleRemoveChannel = (channel) => {
    showModal('removing', channel)
    setActiveId()
  }

  return (
    <>
      <h3>CHANNELS</h3>
      <Button variant='info' onClick={() => showModal('adding')}> + </Button>
      <ListGroup variant="flush" className='gap-2'>
        {channels.map((channel) => (
          <Col key={channel.id}>
            <ListGroup.Item
              active={activeId === channel.id}
              onClick={() => setActiveId(channel?.id)}
              action
              as='div'
              role='button'
              variant='info'
              className='d-flex justify-content-between align-items-center border border-opacity-50 rounded-pill'
            >
              {getChannelName(channel)}
              { channel.removable && (
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic-button" variant='ligth' title='' className='py-0 border-0' />
                  <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleRenameChannel(channel)}>Переименовать</Dropdown.Item>
                  <Dropdown.Item onClick={() => handleRemoveChannel(channel)}>Удалить</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </ListGroup.Item>
          </Col>
        ))}
      </ListGroup>
    </>
  )
}

export default ChannelsComponent
