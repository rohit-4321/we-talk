import { useState, FC } from 'react';
import {
  InputContainer, MessageInput, SendButton,
} from './InputBox.style';

interface InputBoxProps {
  handleOnSend: (inputMessage: string) => void,
}
const InputBox:FC<InputBoxProps> = ({ handleOnSend }) => {
  const [message, setMessage] = useState<string>('');

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
            handleOnSend(message);
            setMessage('');
          }
        }}
      >
        Send
      </SendButton>
    </InputContainer>
  );
};
export default InputBox;
