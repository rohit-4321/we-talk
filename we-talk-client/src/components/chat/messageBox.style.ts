import styled from 'styled-components';

export const MessageContainer = styled.div`
overflow-y: auto;
display: flex;
flex-direction: column;
height: 100%;
&::-webkit-scrollbar {
  display: none;
}
`;

export const SelfMessageStyle = styled.span`
background-color: #30e36b;
color: black;
border-radius: 5px;
padding: 7px;
margin-left: auto;
max-width: 40%;
overflow-wrap: break-word;
`;

export const RecipientMessageStyle = styled.span`
background-color: #a5d1b4;
border-radius: 5px;
color: black;
padding: 7px;
margin-right: auto;
max-width: 40%;
overflow-wrap: break-word;
`;
