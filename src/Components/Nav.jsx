import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
function Nav() {
  return (
    <StyledNav>
      <h1>
        <Link to="/">John Locks</Link>
      </h1>
      <ul>
        <li>
          <Link to="/scores">Scores</Link>
        </li>
        <li>
          <Link to="/groups">Groups</Link>
        </li>
        <li>
          <Link to="/recentGames">Recent Games</Link>
        </li>
      </ul>
    </StyledNav>
  );
}

const StyledNav = styled.nav`
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  height: 3rem;
  border: 1px solid black;

  h1 {
    font-size: 1rem;
  }

  a {
    color: black;
    text-decoration: none;
  }

  ul {
    display: flex;
    align-items: center;
  }
  li {
    list-style: none;
    margin-left: 1rem;
  }
`;
export default Nav;
