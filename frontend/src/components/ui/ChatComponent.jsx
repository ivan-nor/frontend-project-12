/* eslint-disable react/prop-types */
import { Row, Col, Tab, Nav, Button, ButtonGroup, Dropdown } from 'react-bootstrap'
import { useSelector } from 'react-redux'
// import ChannelsComponent from './ChannelsComponent'
import ChatWindow from './ChatWindow'
import InputMessageComponent from './InputMessageComponent'
import { selectors as channelsSelectors } from '../../slices/channelsSlice'
// import { useEffect } from 'react'

// ДОБАВИТЬ обработку кликов по кнопке канала

const Buttons = ({ channel, showModal }) => (
  <ButtonGroup aria-label="channel buttons">
    <Dropdown as={ButtonGroup}>
      <Button variant="success" size='xl'>{channel.name}</Button>
      { channel.removable && (
        <>
          <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1" onClick={() => showModal('renaming', channel)}>Переименовать</Dropdown.Item>
            <Dropdown.Item href="#/action-2" onClick={() => showModal('removing', channel)}>Удалить</Dropdown.Item>
          </Dropdown.Menu>
        </>
      )}
    </Dropdown>
  </ButtonGroup>
)

const ChatComponent = ({ handleSendMessage, handleActiveTab, activeId, showModal, channels }) => (
  <Tab.Container id="left-tabs-example" activeKey={activeId} fluid>
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
                />
              </Nav.Link>
            </Nav.Item>
          ))}
        </Nav>
      </Col>
      <Col sm={9} className='d-flex flex-column justify-content-between'>
        <Tab.Content defaultActiveKey={activeId}>
          {channels.map((channel) => (
              <Tab.Pane eventKey={channel.id} as='div' key={channel.id}>
                <ChatWindow id={channel.id} />
              </Tab.Pane>
          ))}
        </Tab.Content>
        <InputMessageComponent handleSubmit={handleSendMessage} />
      </Col>
    </Row>
  </Tab.Container>
)

export default ChatComponent
