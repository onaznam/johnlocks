import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ContainerDiv, StyledButton } from "./StyledComponents";
import styled from "styled-components";
function Groups() {
  const [username, setUsername] = useState();
  const [groups, setGroups] = useState();
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

  const getGroups = () => {
    axios
      .get("https://energetic-sugary-molybdenum.glitch.me/getGroups", {
        params: { username },
      })
      .then((response) => {
        setGroups(response.data);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  const handleNavigation = (group) => {
    console.log("group: ", group);
    navigate(`/groups/${group.groupName}/id/${group.teamID}`);
  };

  useEffect(() => {
    authenticateCookie();
  }, []);

  useEffect(() => {
    getGroups();
  }, [username]);

  useEffect(() => {
    console.log("getGroups: ", groups);
  }, [groups]);

  return (
    <StyledContainerDiv>
      {username && (
        <div>
          <h2>Your Groups</h2>
          <div>
            {groups &&
              groups.map((group, idx) => (
                <StyledButton key={idx} onClick={() => handleNavigation(group)}>
                  <p>{group.groupName}</p>
                </StyledButton>
              ))}
          </div>
          <StyledButton onClick={() => navigate("/createGroup")}>
            <p>Create a group</p>
          </StyledButton>
        </div>
      )}
      {!username && (
        <div>
          <h2>Groups</h2>
          <StyledButton onClick={() => navigate("/login")}>
            <p>Login</p>
          </StyledButton>
          <StyledButton onClick={() => navigate("/register")}>
            <p>Register</p>
          </StyledButton>
        </div>
      )}
    </StyledContainerDiv>
  );
}

const StyledContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  text-align: center;
`;

export default Groups;
