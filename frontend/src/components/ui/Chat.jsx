/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Row, Col, Container } from 'react-bootstrap'
import ChatBox from './ChatBox'
import MessageInput from './MessageInput'
import ChannelsBox from './ChannelsBox'
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn
} from 'mdb-react-ui-kit'

const Chat = ({
  handleSendMessage,
  handleActiveTab,
  activeId,
  showModal,
  channels,
  hideModal,
  currentChannel
}) => (
  <Container className="container h-100 my-4 overflow-hidden rounded shadow" bg="light">
    <Row className="h-100 bg-white">
      <Col sm={3} className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
        <ChannelsBox
          setActiveId={handleActiveTab}
          hideModal={hideModal}
          showModal={showModal}
          channels={channels}
          activeId={activeId}
        />
      </Col>
      <Col sm={9} className="col p-0 h-100 d-flex flex-column">
        <ChatBox
          activeId={activeId}
          currentChannel={currentChannel}
        />
        <MessageInput handleSendMessage={handleSendMessage} />
      </Col>
    </Row>
  </Container>
)

export default Chat
