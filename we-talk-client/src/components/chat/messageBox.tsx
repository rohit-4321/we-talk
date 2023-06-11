/* eslint-disable react/no-array-index-key */
import {
  FC,
} from 'react';
import { MessageContainer, RecipientMessageStyle, SelfMessageStyle } from './messageBox.style';
import { IChatMessage } from '../../global/chat';
import useScrollRef from '../../hooks/useScrollRef';

const SelfMessage: FC<{ message: string }> = ({ message }) => (
  <div style={{
    display: 'flex',
    margin: '7px 10px',
  }}
  >
    <SelfMessageStyle>{ message }</SelfMessageStyle>
  </div>
);

const RecipientMessage: FC<{ message: string }> = ({ message }) => (
  <div style={{
    display: 'flex',
    margin: '7px 10px',
  }}
  >
    <RecipientMessageStyle>{message}</RecipientMessageStyle>
  </div>
);

interface MessageBoxProps {
  allMessage: IChatMessage[],
}
export const MessageBox: FC<MessageBoxProps> = ({
  allMessage,
}) => {
  const [ref] = useScrollRef<HTMLDivElement>();

  return (
    <MessageContainer ref={ref}>
      {
          allMessage.map((chatMsg, i) => (
            chatMsg.isSelf ? <SelfMessage key={i} message={chatMsg.message} />
              : <RecipientMessage message={chatMsg.message} key={i} />
          ))
        }
    </MessageContainer>
  );
};

export default MessageBox;
