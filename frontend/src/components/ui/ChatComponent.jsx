/* eslint-disable react/prop-types */
import { Row, Col, Tab, Nav, Button, ButtonGroup, Dropdown, Container } from 'react-bootstrap'
import ChatWindow from './ChatWindow'
import InputMessageComponent from './InputMessageComponent'

const Buttons = ({ channel, showModal, handleActiveTab }) => {
  const handleRenameChannel = () => {
    showModal('renaming', channel)
    handleActiveTab(channel.id)
  }

  const handleRemoveChannel = () => {
    showModal('removing', channel)
    handleActiveTab()
  }

  const getChannelName = ({ name, removable }) => (removable) ? name : `# ${name}`

  return (
    <ButtonGroup aria-label="channel buttons">
      <Dropdown as={ButtonGroup}>
        <Button variant="success" size='xl'>{getChannelName(channel)}</Button>
        { channel.removable && (
          <>
            <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1" onClick={handleRenameChannel}>Переименовать</Dropdown.Item>
              <Dropdown.Item href="#/action-2" onClick={handleRemoveChannel}>Удалить</Dropdown.Item>
            </Dropdown.Menu>
          </>
        )}
      </Dropdown>
    </ButtonGroup>
  )
}

const ChatComponent = ({ handleSendMessage, handleActiveTab, activeId, showModal, channels }) => {
  // const inputRef = useRef()

  // useEffect(() => inputRef.current.focus())

  return (
    <Container fluid={'xl'} className='p-2'>
    <Tab.Container id="left-tabs-example" activeKey={activeId} fluid >
      <Row>
        <Col sm={3}>
          <Button variant='secondary' onClick={() => showModal('adding')}>+</Button>
          <Nav variant="pills" className="flex-column">
            {channels.map((channel) => (
              <Nav.Item key={channel.id}>
                <Nav.Link as='div' eventKey={channel.id} onClick={() => handleActiveTab(channel.id)}>
                  <Buttons
                    channel={channel}
                    showModal={showModal}
                    handleActiveTab={handleActiveTab}
                  />
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Col>
        <Col sm={9} className='d-flex flex-column justify-content-between'>
          <Tab.Content>
            {channels.map((channel) => (
                <Tab.Pane eventKey={channel.id} as='div' key={channel.id}>
                  <ChatWindow channel={channel} />
                </Tab.Pane>
            ))}
          </Tab.Content>
          <InputMessageComponent handleSubmit={handleSendMessage} />
        </Col>
      </Row>
    </Tab.Container>
    </Container>
  )
}
export default ChatComponent
