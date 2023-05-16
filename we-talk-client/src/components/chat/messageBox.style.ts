import styled from 'styled-components';

export const MessageContainer = styled.div`
background-color: gray;
width: 100%;
flex: 95;
overflow-y: auto;
display: flex;
flex-direction: column;
&::-webkit-scrollbar {
  display: none;
}
`;

export const SelfMessageStyle = styled.span`
background-color: green;
padding: 7px;
margin-left: auto;
`;

export const RecipientMessageStyle = styled.span`
background-color: red;
padding: 7px;
margin-right: auto;
`;
