import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ContainerDiv, StyledButton, StyledFormDiv } from "./StyledComponents";

function CreateGroup() {
  const [username, setUsername] = useState();
  const [group, setGroup] = useState("");
  const navigate = useNavigate();

  const authenticateCookie = () => {
    axios
      .get(
        "https://energetic-sugary-molybdenum.glitch.me/api/authenticateCookie",
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setUsername(response.data.username);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  const createGroup = (e) => {
    e.preventDefault();
    axios
      .post("https://energetic-sugary-molybdenum.glitch.me/createGroup", {
        username,
        group,
      })
      .then((response) => {
        if (response.data) {
          navigate("/groups");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    authenticateCookie();
  }, []);

  return (
    <ContainerDiv>
      <StyledFormDiv>
        <h2>Create a group</h2>
        <label>Team Group Name</label>
        <input value={group} onChange={(e) => setGroup(e.target.value)}></input>
        <StyledButton onClick={createGroup}>Submit</StyledButton>
      </StyledFormDiv>
    </ContainerDiv>
  );
}

export default CreateGroup;
