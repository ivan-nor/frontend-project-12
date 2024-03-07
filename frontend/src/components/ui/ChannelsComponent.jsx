/* eslint-disable react/prop-types */
import { ListGroup, Col } from 'react-bootstrap'

const ChannelsComponent = ({ channels }) => {
  const renderChannels = () => (
    <ListGroup>
      {channels.map(({ id, name, removable }) => <ListGroup.Item key={id}>{name}</ListGroup.Item>)}
    </ListGroup>
  )

  return (
    <Col>
      <h3>CHANNELS</h3>
      {renderChannels()}
    </Col>
  )
}

export default ChannelsComponent
