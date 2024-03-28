/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { messagesOfChannelSelector } from '../../slices/messagesSlice';

const ChatWindow = ({ activeId, currentChannel: channel }) => {
  const messages = useSelector(messagesOfChannelSelector(activeId));
  const { t } = useTranslation();

  return (
    <div className="">
      <h1>
        {t('chat.title')}
        {' '}
        {channel?.id}
        {' '}
        {channel?.name}
      </h1>
      <div className="overflow-scroll">
        <ul>
          {messages?.map((message) => (
            <li key={message.id}>
              {t('chat.user')}
              :
              {' '}
              {message.username}
              {' '}
              | MESSAGE:
              {' '}
              {message.body}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatWindow;
