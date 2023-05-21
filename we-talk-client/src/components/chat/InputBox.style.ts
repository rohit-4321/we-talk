import styled from 'styled-components';

export const InputContainer = styled.form`
/* padding: 10px 0px; */
display: flex;
height: 100%;
flex-direction: row;
gap: 5px;
`;

export const MessageInput = styled.input`
flex: 82;
flex-shrink: 0;
background-color:  rgba(255, 255, 255, 0.08);
border: none;
outline: none;
padding: 0px 10px;
&:focus{
  border: 2px solid rgba(255, 255, 255, 0.16);
  border-radius: 4px;
}
`;

export const SendButton = styled.button`
flex: 18;
background-color: #7A48B6;
border: none;
`;
