import { FC, ReactNode } from 'react';
import styled from 'styled-components';

interface MessageContainerWrapperParams {
  children: [ReactNode, ReactNode]
}

const Wrapper = styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
`;
const HeaderPane = styled.div`
flex: 5;
width: 100%;
`;
const MessagePane = styled.div`
flex: 95;
width: 100%;
overflow-y: auto;
`;

const MessageContainerWrapper: FC<MessageContainerWrapperParams> = ({ children }) => {
  const [header, messagesComp] = children;
  return (
    <Wrapper>
      <HeaderPane>
        {header}
      </HeaderPane>
      <MessagePane>
        {messagesComp}
      </MessagePane>
    </Wrapper>
  );
};

export default MessageContainerWrapper;
