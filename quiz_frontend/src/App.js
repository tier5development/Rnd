import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Setting from "./components/Settings";
import Questions from "./components/Questions";
import FinalScreen from "./components/FinalScreen/index";
import { Typography } from "@mui/material";
import "./App.css";


function App() {
  const user = localStorage.getItem("token");
  return (
    <div className="App">
      <h1 className="header">QuizZ Application</h1>
      <Routes>
       {user &&<Route path="/" exact element={<Main />} />}
       <Route path="/signup" exact element={<Signup />}/>
       <Route path="/login" exact element={<Login />}/>
       <Route path="/" exact element={<Navigate replace to="/login" />}/>
       <Route path="/settings" exact element={<Setting />}/>
       <Route path="/questions" exact element={<Questions />}/>
       <Route path="/finalScreen" exact element={<FinalScreen />}/>
     </Routes>
      {/* <Router>
        <Container maxWidth="sm">
          <Box textAlign="center" mt={5}>
            <Routes>
              {user && <Route path="/" exact element={<Main />} />}
              <Route path="/signup" exact element={<Signup />} />
              <Route path="/login" exact element={<Login />} />
              <Route
                path="/"
                exact
                element={<Navigate replace to="/login" />}
              />
              <Route path="/settings" exact element={<Setting />} />
              <Route path="/questions" exact element={<Questions />} />
              <Route path="/finalScreen" exact element={<FinalScreen />} />
            </Routes>
          </Box>
        </Container>
      </Router> */}
    </div>
  );
}

export default App;
