/* eslint-disable react/prop-types */
const ChannelsComponent = ({ channels }) => {
  const renderChannels = () => (<ul>
    {channels.map(({ id, name, removable }) => <li key={id}>{name}</li>)}
  </ul>)

  return (
    <>
      <h3>CHANNELS</h3>
      {renderChannels()}
    </>
  )
}

export default ChannelsComponent
