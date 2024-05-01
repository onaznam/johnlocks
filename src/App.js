import Scores from "./Components/Scores";
import Nav from "./Components/Nav";
import Home from "./Components/Home";
import Groups from "./Components/Groups";
import Matchups from "./Components/Matchups";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Logout from "./Components/Logout";
import RecentGames from "./Components/RecentGames";
import CreateGroup from "./Components/CreateGroup";
import GroupPage from "./Components/GroupPage";
import { Route, Routes } from "react-router-dom";
import { GlobalStyle } from "./Components/StyledComponents";
function App() {
  return (
    <div>
      <GlobalStyle />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scores" element={<Scores />} />
        <Route path="/groups" element={<Groups />} />
        <Route
          path="/groups/:groupName/id/:teamID/matchups"
          element={<Matchups />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/recentGames" element={<RecentGames />} />
        <Route path="/createGroup" element={<CreateGroup />} />
        <Route path="/groups/:groupName/id/:teamID" element={<GroupPage />} />
      </Routes>
    </div>
  );
}

export default App;
