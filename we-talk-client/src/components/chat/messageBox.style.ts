import styled from 'styled-components';

export const MessageContainer = styled.div`
display: flex;
flex-direction: column;
overflow-y: auto;
height: 100%;
&::-webkit-scrollbar {
  display: none;
}
`;

export const SelfMessageStyle = styled.span`
background-color: #323435;
color: #CBCBCB;
border-radius: 5px;
padding: 7px;
margin-left: auto;
max-width: 40%;
overflow-wrap: break-word;
border: 1px solid #4A4D4F;
`;

export const RecipientMessageStyle = styled.span`
background-color: #202122;
border-radius: 5px;
color: #CBCBCB;
padding: 7px;
margin-right: auto;
max-width: 40%;
overflow-wrap: break-word;
border: 1px solid #4A4D4F;
`;
