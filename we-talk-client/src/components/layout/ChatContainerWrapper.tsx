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
`;
const ChatPane = styled.div`
flex: 95;
width: 100%;
overflow-y: auto;
`;
const InputPane = styled.div`
flex: 5;
width: 100%;
background-color: blue;

`;
const ChatContainerWrapper: FC<ChatContainerWrapperParams> = ({ children }) => {
  const [messageComp, inputComp] = children;
  return (
    <ChatContainerSplit>
      <ChatPane>
        {messageComp}
      </ChatPane>
      <InputPane>
        {inputComp}
      </InputPane>
    </ChatContainerSplit>
  );
};
export default ChatContainerWrapper;
