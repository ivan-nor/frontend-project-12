/* eslint-disable react/prop-types */
import { ListGroup, Col, Button, Dropdown, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const getChannelName = ({ removable, name }) => removable ? name : `# ${name}`

const ChannelsComponent = ({ channels, activeId, setActiveId, showModal }) => {
  const { t } = useTranslation()

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
      <Row>
        <Col>
          <h3>{t('channels.title')}</h3>
        </Col>
        <Col className='d-flex justify-content-end'>
          <Button variant='info' onClick={() => showModal('adding')}>{t('channels.add')}</Button>
        </Col>
      </Row>
      <ListGroup variant="flush" className='d-flex gap-2 nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block gap-2'>
        {channels.map((channel) => (
          <>
            <ListGroup.Item
              key={channel.id}
              active={activeId === channel.id}
              onClick={() => setActiveId(channel?.id)}
              action
              as='button'
              role='button'
              variant='info'
              className='d-flex justify-content-between align-items-center border border-opacity-50 rounded-pill w-100'
            >
              {getChannelName(channel)}
              { channel.removable && (
                <Dropdown>
                  <Dropdown.Toggle id="dropdown-basic-button" title='' className='py-0 border-0' />
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleRenameChannel(channel)}>{t('channels.rename')}</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleRemoveChannel(channel)}>{t('channels.remove')}</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              )}
            </ListGroup.Item>
          </>
        ))}
      </ListGroup>
    </>
  )
}

export default ChannelsComponent
