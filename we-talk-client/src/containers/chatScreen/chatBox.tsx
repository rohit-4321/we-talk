import {
  FC, useCallback, useEffect, useRef,
} from 'react';
import { useRecoilState } from 'recoil';
import InputBox from '../../components/chat/InputBox';
import { MessageBox } from '../../components/chat/messageBox';
import ChatLayout from '../../components/layout/ChatLayoutWrapper';
import { AllMessageAtom } from '../../global/chat';
import SocketFactory from '../../service/socket';
import ChatContainerWrapper from '../../components/layout/ChatContainerWrapper';
import VideoPane from './VideoPane';

const ChatBox: FC = () => {
  const socketRef = useRef(SocketFactory.getInstance());

  const [allMessage, setAllMessage] = useRecoilState(AllMessageAtom);

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

  const handleOnSend = useCallback((inputMessage: string) => {
    setAllMessage((msgList) => [...msgList, {
      message: inputMessage,
      isSelf: true,
    }]);
    socketRef.current.emitPrivateMessage({
      message: inputMessage,
    });
  }, [setAllMessage]);

  return (
    <ChatLayout>
      <VideoPane socketRef={socketRef} />
      <ChatContainerWrapper>
        <MessageBox allMessage={allMessage} />
        <InputBox handleOnSend={handleOnSend} />
      </ChatContainerWrapper>
    </ChatLayout>
  );
};
export default ChatBox;
