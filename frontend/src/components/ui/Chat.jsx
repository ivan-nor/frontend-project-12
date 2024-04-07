/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import MessageInput from './MessageInput'
import '../../assets/Chat.css'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBTypography,
  MDBInputGroup,
  MDBScrollbar,
  MDBBtn,
  MDBBtnGroup,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBListGroup,
  MDBListGroupItem
} from 'mdb-react-ui-kit'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { messagesOfChannelSelector } from '../../slices/messagesSlice'
import { useEffect, useRef } from 'react'

const Chat = ({
  handleSendMessage,
  handleActiveTab,
  activeId,
  showModal,
  channels,
  hideModal,
  currentChannel
  // }) => (
  //   <Container className="container h-100 my-4 overflow-hidden rounded shadow" bg="light">
  //     <Row className="h-100 bg-white">
  //       <Col sm={3} className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
  //         <ChannelsBox
  //           setActiveId={handleActiveTab}
  //           hideModal={hideModal}
  //           showModal={showModal}
  //           channels={channels}
  //           activeId={activeId}
  //         />
  //       </Col>
  //       <Col sm={9} className="col p-0 h-100 d-flex flex-column">
  //         <ChatBox
  //           activeId={activeId}
  //           currentChannel={currentChannel}
  //         />
  //         <MessageInput handleSendMessage={handleSendMessage} />
  //       </Col>
  //     </Row>
  //   </Container>
  // )

}) => {
  const { t } = useTranslation()
  const messages = useSelector(messagesOfChannelSelector(activeId))
  const user = useSelector(state => state.users.currentUser)
  const chatRef = useRef(null)

  useEffect(() => { // скролл при добавлении сообщения
    chatRef.current.scrollTop = chatRef.current.scrollHeight
  }, [messages])

  // #TODO возможно достаточно будет только карточки, чтобы уменьшить
  // размеры кода верстки
  return (
    <MDBContainer className="py-5">
      <MDBCard id="chat3" className='h-100' style={{ maxHeight: '80vh' }}>
        <MDBCardBody className=''>
          <MDBRow className='h-100'>
            <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0 h-100 overflow-auto">
              <span className='d-flex align-items-center'>
                <h3>{t('channels.title')}</h3>
                <MDBInputGroup className="rounded mb-3 justify-content-md-end">
                  <MDBBtn onClick={() => showModal('adding')}>{t('channels.add')}</MDBBtn>
                </MDBInputGroup>
              </span>
              <MDBListGroup light className='overflow-auto h-100'>
                {channels.map((channel) => {
                  const variant = activeId === channel.id ? 'secondary' : 'white'

                  return (
                    <MDBListGroupItem
                      key={channel.id}
                      noBorders
                      active={channel.id === activeId}
                      aria-current='true'
                      className='p-0 border-bottom d-flex justify-content-between align-items-center'
                      color={variant}
                      onClick={() => handleActiveTab(channel.id)}
                    >
                      <MDBBtnGroup className='w-100 shadow-0' color={variant} size='lg'>
                        <MDBBtn disabled size='lg' color={variant} className='text-start'># {channel.name}</MDBBtn>
                        {channel.removable &&
                          <MDBBtnGroup>
                            <MDBDropdown>
                              <MDBDropdownToggle color={variant} className='h-100'>
                                <span style={{ visibility: 'hidden' }}>
                                  {/* Управление каналом */}
                                </span>
                              </MDBDropdownToggle>
                              <MDBDropdownMenu>
                                <MDBDropdownItem link onClick={() => showModal('renaming', channel)}>{t('channels.rename')}</MDBDropdownItem>
                                <MDBDropdownItem link onClick={() => showModal('removing', channel)}>{t('channels.remove')}</MDBDropdownItem>
                              </MDBDropdownMenu>
                            </MDBDropdown>
                          </MDBBtnGroup>
                        }
                      </MDBBtnGroup>
                    </MDBListGroupItem>
                  )
                })}
              </MDBListGroup>
            </MDBCol>

            <MDBCol md="6" lg="7" xl="8" className='h-100 d-flex flex-column'>
              <h1 className='w-100 text-center'>{`${t('chat.title')} ${currentChannel?.id} ${currentChannel?.name}`}</h1>
              <div className="overflow-auto h-100 w-100" ref={chatRef}>
                {messages?.map((message) => {
                  const isCurrentUserMessage = message.username === user.username
                  const date = new Date(message.creationDate)
                  // console.log(date, isCurrentUserMessage, message)

                  return (
                    <div key={message.id}>
                      <div className={isCurrentUserMessage ? 'd-flex flex-row justify-content-end' : 'd-flex flex-row justify-content-start'}>
                        <div>
                          {!isCurrentUserMessage &&
                            <h6 className=" m-0 rounded-3 text-muted">
                              {message.username}
                            </h6>
                          }
                          <p className='small p-2 me-3 mb-1 rounded-3' style={{ backgroundColor: isCurrentUserMessage ? '#fff' : '#386bc0' }}>
                            {message.body}
                          </p>
                          <p className="small me-3 mb-3 rounded-3 text-muted">
                            {`${date.getHours()}:${date.getMinutes()}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <MessageInput handleSendMessage={handleSendMessage} />
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  )
}

export default Chat
