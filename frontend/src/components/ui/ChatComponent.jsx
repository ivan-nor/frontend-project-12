/* eslint-disable react/prop-types */
import { Row, Col, Tab, Nav, Button, ButtonGroup, Dropdown } from 'react-bootstrap'
// import ChannelsComponent from './ChannelsComponent'
import ChatWindow from './ChatWindow'
import InputMessageComponent from './InputMessageComponent'

// ДОБАВИТЬ обработку киликов по кнопке канала

const Buttons = () => (
  <ButtonGroup aria-label="Basic example">
      <Dropdown as={ButtonGroup}>
      <Button variant="success" size='xl'>Split Button</Button>

      <Dropdown.Toggle split variant="success" id="dropdown-split-basic" />

      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </ButtonGroup>
)

const ChatComponent = ({ channels, messages }) => {
  return (
    <Tab.Container id="left-tabs-example" defaultactivekey="first" fluid>
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item>
              <Nav.Link as='div' eventKey="first" >
                <Buttons />
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as='div' eventKey="second">Tab 2</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={9} className='d-flex flex-column justify-content-between'>
          <Tab.Content defaultactivekey='first'>
            <Tab.Pane eventKey="first" as='div'>
              <ChatWindow channels={channels[0]}/>
            </Tab.Pane>
            <Tab.Pane eventKey="second" as='div'>
              <ChatWindow channels={channels[1]} />
            </Tab.Pane>
          </Tab.Content>
          <InputMessageComponent />
        </Col>
      </Row>
    </Tab.Container>
  )
}

export default ChatComponent
