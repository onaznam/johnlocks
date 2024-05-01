import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { StyledDiv, StyledButton, ContainerDiv } from "./StyledComponents";

function Logout() {
  const navigate = useNavigate();
  const handleLogout = () => {
    axios
      .post(
        "https://energetic-sugary-molybdenum.glitch.me/logout",
        {},
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.loggedOut === true) {
          navigate("/");
        }
      })
      .catch((error) => {
        console.log("error logging out user: ", error);
      });
  };

  return (
    <ContainerDiv>
      <h2>Logout</h2>
      <StyledButton className="first-button" onClick={handleLogout}>
        Logout
      </StyledButton>
      <StyledButton onClick={() => navigate("/groups")}>Groups</StyledButton>
      <StyledButton onClick={() => navigate("/")}>Home</StyledButton>
    </ContainerDiv>
  );
}

export default Logout;
