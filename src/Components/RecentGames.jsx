import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";

function RecentGames() {
  const [data, setData] = useState([]);

  const getRecentGames = () => {
    axios
      .get("https://energetic-sugary-molybdenum.glitch.me/getRecentGames")
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

  useEffect(() => {
    getRecentGames();
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <ContainerDiv>
      <CardsDiv>
        {data &&
          [...data]
            .reverse()
            .slice(0, 15)
            .map((item) => (
              <ScoreCardDiv key={item.id}>
                <p>{getDate(item.startTimestamp)}</p>
                <p>
                  {item.awayTeam[0].name} @ {item.homeTeam[0].name}
                </p>
                <p>
                  [{item.awayScore[0].current} - {item.homeScore[0].current}]
                </p>
              </ScoreCardDiv>
            ))}
      </CardsDiv>
    </ContainerDiv>
  );
}

const ContainerDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardsDiv = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 0.5rem;
`;

const ScoreCardDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0.5rem;
  height: 10rem;
  width: 20rem;
  border: 1px solid grey;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0.1, 0.2, 0.3, 0.4);
  p {
    margin-left: 0.5rem;
    margin-right: 0.5rem;
  }
`;

export default RecentGames;
