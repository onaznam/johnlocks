import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { StyledButton, StyledFormDiv } from "./StyledComponents";
import styled from "styled-components";

function GroupPage() {
  const [groupUsers, setGroupUsers] = useState([]);
  const [isAddPerson, setisAddPerson] = useState(false);
  const [isShowUsers, setIsShowUsers] = useState(false);
  const [newUser, setNewUser] = useState("");
  const { groupName, teamID } = useParams();
  const navigate = useNavigate();

  const getGroupDetails = () => {
    axios
      .get("https://energetic-sugary-molybdenum.glitch.me/getGroupDetails", {
        params: { groupName, teamID },
      })
      .then((response) => {
        setGroupUsers(response.data);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  const addUser = (e) => {
    e.preventDefault();
    if (newUser === groupUsers[0].username) {
      alert("You can't add yourself to the group dumbass");
      setNewUser("");
    } else if (groupUsers.find((user) => user.username === newUser)) {
      alert("User is already inside of the group");
      setNewUser("");
    } else {
      axios
        .post("https://energetic-sugary-molybdenum.glitch.me/addUser", {
          teamID,
          newUser,
          groupName,
        })
        .then((response) => {
          console.log("this should be the new user: ", response.data);
          if (response.data) {
            window.location.reload();
          }
        })
        .catch((error) => {
          console.log("error: ", error);
          alert("Username does not exist");
          setNewUser("");
        });
    }
  };

  useEffect(() => {
    getGroupDetails();
  }, []);

  useEffect(() => {
    console.log("group users: ", groupUsers);
  }, [groupUsers]);

  return (
    <StyledContainerDiv>
      <h2>Group {groupName}</h2>
      <StyledButton onClick={() => setIsShowUsers(!isShowUsers)}>
        Show Users
      </StyledButton>
      {isShowUsers &&
        groupUsers &&
        groupUsers.map((user, idx) => (
          <StyledUserStats key={idx}>
            <p>
              {user.username} ({user.wins}/{user.losses})
            </p>
          </StyledUserStats>
        ))}
      <StyledButton
        onClick={() => setisAddPerson(!isAddPerson)}
        style={{ marginBottom: isAddPerson ? "1rem" : "0" }}
      >
        Add person
      </StyledButton>
      {isAddPerson && (
        <StyledFormDiv>
          <label>username</label>
          <input
            value={newUser}
            onChange={(e) => setNewUser(e.target.value)}
          ></input>
          <StyledButton onClick={addUser}>submit</StyledButton>
        </StyledFormDiv>
      )}
      <StyledButton
        onClick={() => navigate(`/groups/${groupName}/id/${teamID}/matchups`)}
      >
        Your Predictions
      </StyledButton>
    </StyledContainerDiv>
  );
}

const StyledContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`;

const StyledUserStats = styled.div`
  text-align: center;
  height: 2rem;
  width: 15rem;
  border: 1px solid black;
  margin: 1rem;
  margin-bottom: 0rem;
`;

export default GroupPage;
