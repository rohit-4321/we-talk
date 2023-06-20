import { ArrowDownOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { FC } from 'react';

const MoreMessageArrowContainer = styled.div`
width: 40px;
height: 40px;
border-radius: 100px;
background-color: #469b78;
display: flex;
box-shadow: 0 0 13px 2px #595959;
justify-content: center;
align-items: center;
opacity: 0.8;
`;

type OwnProps = {
  onClick: () => void;
};
const MoreMessageArrow:FC<OwnProps> = ({ onClick }) => (
  <MoreMessageArrowContainer onClick={() => { onClick(); }}>
    <ArrowDownOutlined />
  </MoreMessageArrowContainer>
);

export default MoreMessageArrow;
