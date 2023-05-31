import React, { FC } from 'react';
import styled from 'styled-components';

interface PanelWrapperProps {
  children: [React.ReactNode, React.ReactNode];

}
const SplitChatScreen = styled.div`
width: 100%;
height: 100vh;
background-color: transparent;
/* background-image: linear-gradient(to right, #003c58, #063450, #0b2c47, #0d243e, #0e1c35); */
display: flex;
/* gap: 10px; */
`;
const PaneVideo = styled.div`
flex: 3;
`;
const PaneChat = styled.div`
flex: 7;
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
