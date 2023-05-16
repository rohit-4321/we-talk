import styled from 'styled-components';

export const ChatBoxContainer = styled.div`
  width: 400px;
  height: 600px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  background-color: blueviolet;
`;

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

export const InputContainer = styled.div`
width: 100%;
flex: 5;
background-color: red;

display: flex;
flex-direction: row;
gap: 5px;
`;

export const MessageInput = styled.input`
flex-grow: 82;
`;

export const SendButton = styled.button`
flex-grow: 18;
`;

export const SelfMessageStyle = styled.span`
background-color: green;
padding: 7px;
/* margin: 15px 10px; */
margin-left: auto;
`;

export const RecipientMessageStyle = styled.span`
background-color: red;
padding: 7px;
/* margin: 15px 10px; */
margin-right: auto;
`;
