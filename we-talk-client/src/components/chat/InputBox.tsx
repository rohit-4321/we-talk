import { useState, FC } from 'react';
import {
  InputContainer, MessageInput, SendButton,
} from './InputBox.style';

interface InputBoxProps {
  handleOnSend: (inputMessage: string) => void,
}
const InputBox:FC<InputBoxProps> = ({ handleOnSend }) => {
  const [message, setMessage] = useState<string>('');

  const onHandleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (message !== '') {
      handleOnSend(message);
      setMessage('');
    }
  };

  return (
    <InputContainer>
      <MessageInput
        type="text"
        placeholder="Message"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <SendButton
        type="submit"
        onClick={onHandleClick}
      >
        Send
      </SendButton>
    </InputContainer>
  );
};
export default InputBox;
