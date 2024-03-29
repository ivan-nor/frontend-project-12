/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Row, Col, Container } from 'react-bootstrap'
import ChatBox from './ChatBox'
import MessageInput from './MessageInput'
import ChannelsBox from './ChannelsBox'
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
import { setActiveId } from '../../slices/channelsSlice'

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
  return (
  <MDBContainer className="py-5 h-100 mh-100">
      <MDBRow className=''>
        <MDBCol md="12" className=''>
          <MDBCard id="chat3" style={{ borderRadius: '15px' }} className=''>
            <MDBCardBody className=''>
              <MDBRow className=''>
                <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0 ">
                  <div className="p-3">
                    <div className="d-grid gap-2 d-md-flex">
                      <h3>{t('channels.title')}</h3>
                      <MDBInputGroup className="rounded mb-3 justify-content-md-end">
                      <MDBBtn onClick={() => showModal('adding')}>{t('channels.add')}</MDBBtn>
                      </MDBInputGroup>
                    </div>
                    <MDBListGroup light>
                        {channels.map((channel) => {
                          const variant = activeId === channel.id ? 'secondary' : null

                          return (
                            <MDBListGroupItem
                              key={channel.id}
                              noBorders
                              active={channel.id === activeId}
                              aria-current='true'
                              // type='button'
                              className='px-3 p-2 border-bottom d-flex justify-content-between align-items-center'
                              // size='lg'
                              onClick={() => handleActiveTab(channel.id)}
                            >
                                <span>
                                  # {channel.name}
                                </span>
                              {channel.removable &&
                                <MDBDropdown group className='shadow-0'>
                                  <MDBDropdownToggle color='light' className='px-3' rounded>
                                  <span style={{ visibility: 'hidden' }}>
                                    {/* Управление каналом */}
                                  </span>
                                  </MDBDropdownToggle>
                                  <MDBDropdownMenu>
                                    <MDBDropdownItem className='p-3' onClick={() => showModal('renaming', channel)}>{t('channels.rename')}</MDBDropdownItem>
                                    <MDBDropdownItem className='p-3' onClick={() => showModal('removing', channel)}>{t('channels.remove')}</MDBDropdownItem>
                                  </MDBDropdownMenu>
                                </MDBDropdown>
                              }
                            </MDBListGroupItem>
                          )
                        })}
                    </MDBListGroup>
                  </div>
                </MDBCol>

                {/* <MDBCol md="6" lg="7" xl="8" className=''>
                    <div className="d-flex flex-row justify-content-start">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                        alt="avatar 1"
                        style={{ width: '45px', height: '100%' }}
                      />
                      <div>
                        <p
                          className="small p-2 ms-3 mb-1 rounded-3"
                          style={{ backgroundColor: '#f5f6f7' }}
                        >
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua.
                        </p>
                        <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
                          12:00 PM | Aug 13
                        </p>
                      </div>
                    </div>

                    <div className="d-flex flex-row justify-content-end">
                      <div>
                        <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                          Ut enim ad minim veniam, quis nostrud exercitation
                          ullamco laboris nisi ut aliquip ex ea commodo
                          consequat.
                        </p>
                        <p className="small me-3 mb-3 rounded-3 text-muted">
                          12:00 PM | Aug 13
                        </p>
                      </div>
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                        alt="avatar 1"
                        style={{ width: '45px', height: '100%' }}
                      />
                    </div>

                  <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                      alt="avatar 3"
                      style={{ width: '40px', height: '100%' }}
                    />
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="exampleFormControlInput2"
                      placeholder="Type message"
                    />
                    <a className="ms-1 text-muted" href="#!">
                      <MDBIcon fas icon="paperclip" />
                    </a>
                    <a className="ms-3 text-muted" href="#!">
                      <MDBIcon fas icon="smile" />
                    </a>
                    <a className="ms-3" href="#!">
                      <MDBIcon fas icon="paper-plane" />
                    </a>
                  </div>
                </MDBCol> */}
              </MDBRow>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

export default Chat