import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body{
    font-family: 'Roboto', sans-serif;
  }
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  p{
    margin: 0.5rem;
  }
  label,input, h2, h3{
    margin-top: 0.5rem;
  }
`;

export const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
  height: 75vh;
  width: 100vw;
`;

export const StyledFormDiv = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2.5rem;
  border: 1px solid grey;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0.1, 0.2, 0.3, 0.4);
  h3 {
    text-decoration: underline;
  }
  label {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }
`;

export const StyledButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  width: 9rem;
  border: 1px solid grey;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0.1, 0.2, 0.3, 0.4);
  margin-top: 1rem;
`;

export const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 10rem;
  height: 3rem;
  border: 1px solid grey;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0.1, 0.2, 0.3, 0.4);
  margin: 0.5rem;
`;
