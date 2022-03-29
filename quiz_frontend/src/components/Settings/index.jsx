import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import useAxiosForSubject from "../../Hooks/useAxiosForSubject";
import SelectField from "../SelectField/selectField";
import TextFill from "../TextField/textField";
import useAxiosForQuestions from "../../Hooks/useAxiosForQuestion";

const Setting = () => {
  // const {response, error, loading}  = useAxios({url: "/api_category.php"})
  const { response, error, loading } = useAxiosForSubject({ url: "/subject" });
  const { questionresponse } = useAxiosForQuestions({ url: "/question"}); //for questions
  console.log(response);
  console.log(questionresponse);

  if (loading) {
    return (
      <Container maxWidth="sm">
        <Box mt={20} width="100%">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" mt={20} color="red">
        Something went wrong
      </Typography>
    );
  }

  const difficultyOptions = [
      {id: "easy", name: "Easy"},
      {id: "medium", name: "Medium"},
      {id: "hard", name: "Hard"},
  ];

  const typeOptions = [
      {id: "multiple", name: "Multiple Choice"},
      {id: "boolean", name: "True/False"}
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
  };

  return (
    <div>
      <div className="main_container">
        <nav className="navbar">
          <h1>QuizZ Application</h1>
          {/* <button className="white_btn" onClick={handleLogout}>
                    Logout
                </button> */}
          <Link to="/login">
            <button className="white_btn" onClick={handleLogout}>
              Logout
            </button>
          </Link>
        </nav>
      </div>
      <form onSubmit={handleSubmit}>
        <SelectField options={response.data} label="Category" />
        {/* <SelectField options={questionresponse.data.difficulty} label="DIfficulty" />
        <SelectField options={questionresponse.data.type} label="Type" /> */}
        <SelectField options={difficultyOptions} label="DIfficulty" />
            <SelectField options={typeOptions} label="Type" />
        <TextFill />
        <Container maxWidth="sm">
          <Box mt={3} width="100%">
            <Button fullWidth variant="contained" type="submit">
              Get Started
            </Button>
          </Box>
        </Container>
      </form>
    </div>
  );
};

export default Setting;
