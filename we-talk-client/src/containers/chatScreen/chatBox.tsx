import { FC } from 'react';
import {
  ChatBoxContainer,
} from './chat.style';
import InputBox from './InputBox';
import { MessageBox } from './messageBox';

// eslint-disable-next-line arrow-body-style
const ChatBox: FC = () => {
  return (
    <ChatBoxContainer style={{ margin: '30px' }}>
      <MessageBox />
      <InputBox />
    </ChatBoxContainer>
  );
};
export default ChatBox;
