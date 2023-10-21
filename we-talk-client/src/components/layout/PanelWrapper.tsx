import React, { FC } from 'react';
import styled from 'styled-components';

interface PanelWrapperProps {
  children: [React.ReactNode, React.ReactNode];

}
const SplitChatScreen = styled.div`
width: 100%;
height: calc(100vh - 2px);
background-color: transparent;
display: flex;
@media (max-width: 800px) {
  flex-direction: column;
}
`;
const PaneVideo = styled.div`
flex-basis: 30%;
flex-grow: 0;
flex-shrink: 0;
`;
const PaneChat = styled.div`
flex-basis: 70%;
flex-grow: 0;
flex-shrink: 0;
overflow: auto;
`;
const PanelWrapper:FC<PanelWrapperProps> = ({ children }) => {
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
export default PanelWrapper;
