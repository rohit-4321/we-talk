/* eslint-disable react/no-array-index-key */
import {
  FC, useCallback, useEffect, useRef,
} from 'react';
import { useRecoilState } from 'recoil';
import { MessageContainer, RecipientMessageStyle, SelfMessageStyle } from './messageBox.style';
import { AllMessageAtom } from '../../global/chat';
import SocketFactory from '../../service/socket';

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

export const MessageBox: FC = () => {
  const [allMessage, setAllMessage] = useRecoilState(AllMessageAtom);

  const socketRef = useRef(SocketFactory.getInstance());

  const onMessage = useCallback(() => (socketRef.current.addprivateMessageEvent((chatData) => {
    setAllMessage((msgs) => [...msgs, {
      message: chatData.message,
      isSelf: false,
    }]);
  })), [setAllMessage]);

  useEffect(() => {
    const onMessageCleanUp = onMessage();
    return () => {
      onMessageCleanUp();
    };
  }, [onMessage]);

  return (
    <MessageContainer>
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
