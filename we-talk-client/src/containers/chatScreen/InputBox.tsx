import { useState } from 'react';
import {
  InputContainer, MessageInput, SendButton,
} from './chat.style';

const InputBox = () => {
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
      <SendButton type="button">Send</SendButton>
    </InputContainer>
  );
};
export default InputBox;
