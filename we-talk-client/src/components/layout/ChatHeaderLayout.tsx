import { FC, ReactNode } from 'react';
import styled from 'styled-components';

const WrapperStyle = styled.div`
display: flex;
gap: 10px;
align-items: center;
padding: 8px 10px;
border-bottom: 1px solid rgba(255, 255, 255, 0.12);
`;
type OwnProps = {
  children: ReactNode,
};
const ChatHeaderlayout:FC<OwnProps> = ({ children }) => (
  <WrapperStyle>
    {children}
  </WrapperStyle>
);

export default ChatHeaderlayout;
