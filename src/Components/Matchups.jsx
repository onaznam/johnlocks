import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { StyledButton } from "./StyledComponents";
import styled from "styled-components";

function Matchups() {
  const [data, setData] = useState([]);
  const [username, setUsername] = useState("");
  const [predictions, setPredictions] = useState(new Map());
  const { teamID, groupName } = useParams();
  const [currentTime, setCurrentTime] = useState(0);
  const [groups, setGroups] = useState([]);

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

  const getMatches = () => {
    axios
      .get("https://energetic-sugary-molybdenum.glitch.me/getMatchups")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  const getDate = (value) => {
    const date = new Date(value * 1000);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleSubmit = () => {
    const predictionsObject = Object.fromEntries(predictions);
    const notComplete = Object.values(predictionsObject).some(
      (e) => e === undefined
    );
    const findGroup = groups.find((grp) => grp.groupName === groupName);
    if (findGroup.prediction.length > 0) {
      alert("You already submitted a prediction for this group");
      return;
    }
    if (!notComplete) {
      // It's complete
      axios
        .post(
          "https://energetic-sugary-molybdenum.glitch.me/submitPrediction",
          {
            predictions: predictionsObject,
            username,
            teamID,
          }
        )
        .then((response) => {
          console.log(response.data);
          window.location.reload();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const getTime = () => {
    const now = new Date();
    const unix = Math.floor(now.getTime() / 1000);
    setCurrentTime(unix);
  };

  const handlePick = (matchupID, teamShortName) => {
    setPredictions((currentPredictions) => {
      const newPredictions = new Map(currentPredictions);
      newPredictions.set(matchupID, teamShortName);
      return newPredictions;
    });
    console.log(predictions);
  };

  useEffect(() => {
    getMatches();
    authenticateCookie();
    getTime();
  }, []);

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

  useEffect(() => {
    getGroups();
  }, [username]);

  useEffect(() => {
    console.log("user groups: ", groups);
  }, [groups]);

  return (
    <StyledContainer>
      <h2>Predictions</h2>
      <h3>
        {username}, {groupName}
      </h3>
      {data.length > 0 &&
        Array.isArray(data) &&
        data.slice(0, 15).map((row, ind) =>
          row.startTimestamp > currentTime ? (
            <StyledMatchupDiv key={row.id}>
              <div>
                <p className="first-item">{getDate(row.startTimestamp)}</p>
                <p>{row.awayTeam[0].name}</p>
                <p className="versus">@</p>
                <p>{row.homeTeam[0].name}</p>
              </div>
              <div style={{ display: "flex" }}>
                <StyledButton
                  style={{ marginRight: "0.2rem" }}
                  onClick={() => handlePick(row.id, row.awayTeam[0].shortName)}
                >
                  {row.awayTeam[0].shortName}
                </StyledButton>
                <StyledButton
                  onClick={() => handlePick(row.id, row.homeTeam[0].shortName)}
                >
                  {row.homeTeam[0].shortName}
                </StyledButton>
              </div>
              <h3 style={{ marginTop: "0.5rem" }}>{predictions.get(row.id)}</h3>
            </StyledMatchupDiv>
          ) : (
            ""
          )
        )}
      <StyledButton onClick={handleSubmit} style={{ marginBottom: "2rem" }}>
        Submit Matchup
      </StyledButton>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 0.5rem;
`;

const StyledMatchupDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20rem;
  height: 15rem;
  border: 1px solid grey;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0.1, 0.2, 0.3, 0.4);
  margin: 0.5rem;
`;

export default Matchups;
