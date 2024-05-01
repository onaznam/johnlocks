import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ContainerDiv, StyledFormDiv, StyledButton } from "./StyledComponents";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://energetic-sugary-molybdenum.glitch.me/login",
        { username, password },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.success === true) {
          navigate("/groups");
        }
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };
  return (
    <ContainerDiv>
      <StyledFormDiv>
        <h2>Login</h2>
        <label>username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <label>password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <StyledButton onClick={handleSubmit}>Submit</StyledButton>
        <h3 onClick={() => navigate("/register")}>Register</h3>
      </StyledFormDiv>
    </ContainerDiv>
  );
}

export default Login;
