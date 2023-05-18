import { useCallback, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import {
  InputContainer, MessageInput, SendButton,
} from './InputBox.style';
import { AllMessageAtom } from '../../global/chat';
import SocketFactory from '../../service/socket';

const InputBox = () => {
  const [message, setMessage] = useState<string>('');

  const [, setAllMessages] = useRecoilState(AllMessageAtom);

  const socketRef = useRef(SocketFactory.getInstance());

  const handleOnSend = useCallback(() => {
    setAllMessages((msgList) => [...msgList, {
      message,
      isSelf: true,
    }]);
    socketRef.current.emitPrivateMessage({
      message,
    });
    setMessage('');
  }, [message, setAllMessages]);

  return (
    <InputContainer>
      <MessageInput
        type="text"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <SendButton
        type="button"
        onClick={() => {
          if (message !== '') {
            handleOnSend();
          }
        }}
      >
        Send
      </SendButton>
    </InputContainer>
  );
};
export default InputBox;
