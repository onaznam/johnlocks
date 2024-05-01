import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ContainerDiv, StyledButton } from "./StyledComponents";

function Home() {
  const [username, setUsername] = useState("");
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

  useEffect(() => {
    authenticateCookie();
  }, []);

  return (
    <ContainerDiv>
      <p>
        Users have the power to create groups and predict weekly which football
        team takes the lock
      </p>
      <p>
        Friends, family, and acquaintances can finally see who's ass and who has
        the John Locks
      </p>
      <p>
        Bragging rights await those that have the john locks, and bullying for
        those with ass picks
      </p>
      <p>Welcome to the shit show. This is John Locks.</p>
      <div>
        <StyledButton onClick={() => navigate("/groups")}>
          View Groups
        </StyledButton>
        {username && (
          <StyledButton onClick={() => navigate("/logout")}>
            Logout
          </StyledButton>
        )}
        {!username && (
          <StyledButton onClick={() => navigate("/login")}>Login</StyledButton>
        )}
      </div>
    </ContainerDiv>
  );
}

export default Home;
