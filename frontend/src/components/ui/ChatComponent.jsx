/* eslint-disable react/prop-types */
import { Row, Col, Container } from 'react-bootstrap';
import ChatWindow from './ChatWindow';
import InputMessageComponent from './InputMessageComponent';
import ChannelsComponent from './ChannelsComponent';

const ChatComponent = ({
  handleSendMessage,
  handleActiveTab,
  activeId,
  showModal,
  channels,
  hideModal,
  currentChannel,
}) => (
  <Container className="container h-100 my-4 overflow-hidden rounded shadow" bg="light">
    {/* <Card body className='p-2' bg='light'> */}
    <Row className="h-100 bg-white">
      <Col sm={3} className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
        <ChannelsComponent
          setActiveId={handleActiveTab}
          hideModal={hideModal}
          showModal={showModal}
          channels={channels}
          activeId={activeId}
        />
      </Col>
      <Col sm={9} className="col p-0 h-100 d-flex flex-column">
        <ChatWindow
          activeId={activeId}
          currentChannel={currentChannel}
        />
        <InputMessageComponent handleSendMessage={handleSendMessage} />
      </Col>
    </Row>
    {/* </Card> */}
  </Container>
);

export default ChatComponent;
