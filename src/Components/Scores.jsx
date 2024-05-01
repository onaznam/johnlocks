import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

function Scores() {
  const [data, setData] = useState([]);
  const getStandings = () => {
    axios
      .get("https://energetic-sugary-molybdenum.glitch.me/getStandings")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };
  useEffect(() => {
    getStandings();
  }, []);

  useEffect(() => {
    console.log("getStandings data: ", data);
  }, [data]);

  return (
    <ContainerDiv>
      <ConferenceDiv>
        {data.slice(2, 10).map((group) => (
          <TeamcardDiv key={group.id}>
            <p>{group.name}</p>
            {group.rows.map((row, rowIdx) => (
              <div key={rowIdx}>
                {row.map((item, itemIdx) => (
                  <div key={itemIdx}>
                    <p>
                      {item.team.name}({item.wins}-{item.losses})
                    </p>
                  </div>
                ))}
              </div>
            ))}
          </TeamcardDiv>
        ))}
      </ConferenceDiv>
    </ContainerDiv>
  );
}

const ContainerDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ConferenceDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  max-width: 100%;
  gap: 1rem;
  margin: 1rem;
`;

const TeamcardDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 8px;
  border: 1px solid grey;
  box-shadow: 0 2px 4px rgba(0.1, 0.2, 0.3, 0.4);
`;

export default Scores;
