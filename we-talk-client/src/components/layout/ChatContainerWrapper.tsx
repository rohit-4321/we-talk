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
border: 1px solid rgba(255, 255, 255, 0.12);
gap: 1rem;
`;
const MessagePane = styled.div`
flex: 95;
width: 100%;
background-color: #1a1a1a;
overflow-y: auto;
`;
const InputPane = styled.div`
flex-basis: 3rem;
flex-shrink: 0;
flex-grow: 0;
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
