/* eslint-disable react/prop-types */
import { Row, Col, Container, Card } from 'react-bootstrap'
import ChatWindow from './ChatWindow'
import InputMessageComponent from './InputMessageComponent'
import ChannelsComponent from './ChannelsComponent'

const ChatComponent = ({
  handleSendMessage,
  handleActiveTab,
  activeId,
  showModal,
  channels,
  hideModal,
  currentChannel
}) => (
  <Container fluid={'xl'} className='p-2' bg='light' style={{ 'max-height': '1000px' }}>
    <Card body className='p-2' bg='light'>
        <Row>
          <Col sm={3} className=''>
            <Row className='gap-2'>
              <ChannelsComponent
                setActiveId={handleActiveTab}
                hideModal={hideModal}
                showModal={showModal}
                channels={channels}
                activeId={activeId}
              />
            </Row>
          </Col>
          <Col sm={9} className='d-flex flex-column justify-content-between'>
            <ChatWindow
              activeId={activeId}
              currentChannel={currentChannel}
            />
            <InputMessageComponent handleSendMessage={handleSendMessage} />
          </Col>
        </Row>
    </Card>
  </Container>
)

export default ChatComponent
