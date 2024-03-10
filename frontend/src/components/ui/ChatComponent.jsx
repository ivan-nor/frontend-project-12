/* eslint-disable react/prop-types */
import { Row, Col, Tab, Nav, Button, ButtonGroup, Dropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
// import ChannelsComponent from './ChannelsComponent'
import ChatWindow from './ChatWindow'
import InputMessageComponent from './InputMessageComponent'
import { selectors as channelsSelectors, addChannel } from '../../slices/channelsSlice'
import { selectors as messagesSelectors } from '../../slices/messagesSlice'

// ДОБАВИТЬ обработку киликов по кнопке канала

const Buttons = ({ name, isRemovable }) => (
  <ButtonGroup aria-label="channel buttons">
    <Dropdown as={ButtonGroup}>
      <Button variant="success" size='xl'>{name}</Button>
      { isRemovable && (
        <>
          <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1">Переименовать</Dropdown.Item>
            <Dropdown.Item href="#/action-2">Удалить</Dropdown.Item>
          </Dropdown.Menu>
        </>
      )}
    </Dropdown>
  </ButtonGroup>
)

const ChatComponent = () => {
  const dispatch = useDispatch()
  const channels = useSelector(channelsSelectors.selectAll)
  const messages = useSelector(messagesSelectors.selectAll)

  console.log('CHAT COMP channels messages', channels, messages)

  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey={1} fluid>
      <Row>
        <Col sm={3}>
          <Button variant='secondary' onClick={() => dispatch(addChannel('TEMP'))}>+</Button>
          <Nav variant="pills" className="flex-column">
            {channels.map((channel) => (
              <Nav.Item key={channel.id}>
                <Nav.Link as='div' eventKey={channel.id} >
                  <Buttons name={channel.name} isRemovable={channel.removable} id={channel.id} />
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Col>
        <Col sm={9} className='d-flex flex-column justify-content-between'>
          <Tab.Content defaultActiveKey={channels[0]?.id}>
            {/* <Tab.Pane eventKey="first" as='div'>
              <ChatWindow channel={channels[0]}/>
              <InputMessageComponent channel={channels[0]}/>
            </Tab.Pane>
            <Tab.Pane eventKey="second" as='div'>
              <ChatWindow id={channels[1]} />
              <InputMessageComponent id={channels[1]} />
            </Tab.Pane> */}
            {channels.map((channel) => {
              const currentMessages = useSelector((state) => messagesSelectors.selectById(state, channel.id))
              console.log('CHAT in map', currentMessages)
              return (
                <Tab.Pane eventKey={channel.id} as='div' key={channel.id}>
                  <ChatWindow id={channel.id} messages={currentMessages}/>
                  <InputMessageComponent id={channel.id}/>
                </Tab.Pane>
              )
            }
            )}
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  )
}

export default ChatComponent
