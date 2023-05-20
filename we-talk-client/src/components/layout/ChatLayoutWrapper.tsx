import React, { FC } from 'react';
import styled from 'styled-components';

interface ChatLayoutWrapperProps {
  children: [React.ReactNode, React.ReactNode];

}
const SplitChatScreen = styled.div`
width: 100%;
height: 100vh;
background-color: transparent;
display: flex;
/* gap: 10px; */
`;
const PaneVideo = styled.div`
flex: 3;
`;
const PaneChat = styled.div`
flex: 7;
`;
const ChatLayoutWrapper:FC<ChatLayoutWrapperProps> = ({ children }) => {
  const [Left, Right] = children;
  return (
    <SplitChatScreen>
      <PaneVideo>
        {Left}
      </PaneVideo>
      <PaneChat>
        {Right}
      </PaneChat>
    </SplitChatScreen>
  );
};
export default ChatLayoutWrapper;
