import styled from 'styled-components';

export const SearchScreenBackground = styled.div`
background-color: #212029;
width: 100%;
height: 100vh;
`;
export const InputBox = styled.div`
  display: flex;
  align-items: center;
  width: 400px;

  & input {
  flex: 7;
  width: 70%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  }
  & button {
    flex: 3;
    width: 30%;
    margin-left: 10px;
  padding: 10px;
  text-decoration: none;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;

  }
`;
