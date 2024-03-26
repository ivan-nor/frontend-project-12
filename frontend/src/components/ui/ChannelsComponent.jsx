/* eslint-disable react/prop-types */
import { Col, Button, Dropdown, Row, ButtonGroup } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

// const getChannelName = ({ removable, name }) => removable ? name : `# ${name}`

const ChannelsComponent = ({ channels, activeId, setActiveId, showModal }) => {
  const { t } = useTranslation()

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

      <ul className='nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block'>
        {channels.map((channel) => {
          const variant = activeId === channel.id ? 'secondary' : null

          return (
            <li key={channel.id} className="nav-item w-100">
              {channel.removable
                ? (
                  <Dropdown as={ButtonGroup} className="d-flex">
                    <Button
                      type="button"
                      key={channel.id}
                      className="w-100 rounded-0 text-start text-truncate"
                      onClick={() => setActiveId(channel?.id)}
                      variant={variant}
                    >
                      <span className="me-1">#</span>
                      {channel.name}
                    </Button>
                    <Dropdown.Toggle split className="flex-grow-0" variant={variant}>
                      <span className="visually-hidden">Управление каналом</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={() => showModal('renaming', channel)}>{t('channels.rename')}</Dropdown.Item>
                      <Dropdown.Item onClick={() => showModal('removing', channel)}>{t('channels.remove')}</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  )
                : (
                  <Button
                    type="button"
                    variant={variant}
                    className="w-100 rounded-0 text-start"
                    onClick={() => setActiveId(channel?.id)}
                  >
                    <span className="me-1">#</span>
                    {channel.name}
                  </Button>
                  )
              }
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default ChannelsComponent
