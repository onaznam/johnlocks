import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ContainerDiv, StyledFormDiv, StyledButton } from "./StyledComponents";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validatePass, setValidatePass] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const ValidateUser = () => {
    const lowercaseUser = username.toLowerCase();
    if (!/^[a-z0-9]+$/.test(lowercaseUser)) {
      alert("Username must only contain letters and numbers.");
      return false;
    } else if (password !== validatePass) {
      alert("Passwords do not match");
      return false;
    } else {
      return true;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    //checks for bad inputs
    if (!ValidateUser()) {
      setUsername("");
      setPassword("");
      setValidatePass("");
      setIsSubmitting(false);
      return;
    }
    axios
      .post("https://energetic-sugary-molybdenum.glitch.me/register", {
        username,
        password,
      })
      .then((response) => {
        console.log(response);
        if (response.statusText === "OK") {
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log("error: ", error);
      });
    setIsSubmitting(false);
  };

  return (
    <ContainerDiv>
      <StyledFormDiv>
        <h2>Register</h2>
        <label>username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          maxLength="14"
        ></input>
        <label>password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          maxLength="20"
        ></input>
        <label>retype password</label>
        <input
          value={validatePass}
          onChange={(e) => setValidatePass(e.target.value)}
          type="password"
          maxLength="20"
        ></input>
        <StyledButton onClick={handleSubmit} disabled={isSubmitting}>
          Submit
        </StyledButton>
        <h3 onClick={() => navigate("/login")}>Login</h3>
      </StyledFormDiv>
    </ContainerDiv>
  );
}
export default Register;
