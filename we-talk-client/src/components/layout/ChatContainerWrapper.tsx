import { FC, ReactNode } from 'react';
import styled from 'styled-components';

interface ChatContainerWrapperParams {
  children: [ReactNode, ReactNode]
}

const ChatContainerSplit = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
background-color: #121212;
border: 1px solid rgba(255, 255, 255, 0.12);
gap: 1rem;
padding: 40px 40px 40px 40px ;
`;
const MessagePane = styled.div`
flex: 95;
width: 100%;
background-color: #1a1a1a;
overflow-y: auto;
`;
const InputPane = styled.div`
flex: 5;
width: 100%;
`;

const ChatContainerWrapper: FC<ChatContainerWrapperParams> = ({ children }) => {
  const [messageComp, inputComp] = children;
  return (
    <ChatContainerSplit>
      <MessagePane>
        {messageComp}
      </MessagePane>
      <InputPane>
        {inputComp}
      </InputPane>
    </ChatContainerSplit>
  );
};
export default ChatContainerWrapper;
