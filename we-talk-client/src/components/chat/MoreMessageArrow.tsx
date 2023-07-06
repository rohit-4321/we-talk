import { ArrowDownOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { FC } from 'react';

const MoreMessageArrowContainer = styled.div`
width: 40px;
height: 40px;
border-radius: 100px;
background-color: #469b78;
display: flex;
/* box-shadow: 0 0 13px 2px #595959; */
justify-content: center;
align-items: center;
/* opacity: 0.8; */
position: relative;
cursor: pointer;
`;

const MessageCountStyle = styled.span`
position: absolute;
background-color: #469b78;
width: 50%;
height: 50%;
display: flex;
justify-content: center;
align-items: center;
border-radius: 100px;
right: 2%;
top: -15%;
`;

type OwnProps = {
  onClick: () => void;
  // eslint-disable-next-line react/require-default-props
  messageCount?: number;
};

const MoreMessageArrow:FC<OwnProps> = ({ onClick, messageCount = 0 }) => (
  <MoreMessageArrowContainer onClick={() => { onClick(); }}>
    {
      messageCount !== 0 && <MessageCountStyle>{messageCount}</MessageCountStyle>
    }
    <ArrowDownOutlined />
  </MoreMessageArrowContainer>
);

export default MoreMessageArrow;
