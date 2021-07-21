import { useContext, useState } from "react";
import { Grid, TextField, Button, Typography, Link, makeStyles, Card} from "@material-ui/core";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { SetPopupContext } from "../App";

import apiList from "../lib/apiList";
import isAuth from "../lib/isAuth";

const useStyles = makeStyles((theme) => ({
  body: {
    padding: "60px 60px",
    background: "#292929",
    color: "#fff"
  },
  inputBox: {
    width: "400px",
    color: "white",
  },
  submitButton: {
    backgroundColor: "#fbc02d",
  },
  Link: {
    color: "#fbc02d",
    fontWeight: "bolder"
  }, 
  input: {
    color: "white"
  },
  floatingLabelFocusStyle: {
    color: "grey"
  },
  notchedOutline: {
    borderColor: '#FFFFFF',
    borderWidth: 1,
    '&:hover': {
      borderColor: '#FFFFFF',
      borderWidth: 2
    },
  }
  
}));

const Login = (props) => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);

  const [loggedin, setLoggedin] = useState(isAuth());

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const [inputErrorHandler, setInputErrorHandler] = useState({
    email: {
      error: false,
      message: "",
    },
    password: {
      error: false,
      message: "",
    },
  });

  const handleInput = (key, value) => {
    setLoginDetails({
      ...loginDetails,
      [key]: value,
    });
  };

  const handleInputError = (key, status, message) => {
    setInputErrorHandler({
      ...inputErrorHandler,
      [key]: {
        error: status,
        message: message,
      },
    });
  };

  const handleLogin = () => {
    const verified = !Object.keys(inputErrorHandler).some((obj) => {
      return inputErrorHandler[obj].error;
    });
    if (verified) {
      axios
        .post(apiList.login, loginDetails)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("type", response.data.type);
          setLoggedin(isAuth());
          setPopup({
            open: true,
            severity: "success",
            message: "Logged in successfully",
          });
          console.log(response);
        })
        .catch((err) => {
          setPopup({
            open: true,
            severity: "error",
            message: err.response.data.message,
          });
          console.log(err.response);
        });
    } else {
      setPopup({
        open: true,
        severity: "error",
        message: "Incorrect Input",
      });
    }
  };

  return loggedin ? (
    <Redirect to="/" />
  ) : (
    <Card className={classes.body} style={{ border: "none", boxShadow: "none" }}>
      <Grid container direction="column" spacing={4} alignItems="center">
      <img src={'../logo-only-white.svg'} height="70" />
        <Grid item>
          <Typography variant="h4" component="h2">
            LOGIN
          </Typography>
        </Grid>
        <Grid item>
        <TextField id="outlined-basic" 
          label="Email" 
          value={loginDetails.email} 
          onChange={(event) => handleInput("email", event.target.value)}
          type="email"
          variant="outlined"
          className={classes.inputBox}
          InputProps={{
            className: classes.input
          }}
          InputLabelProps={{
            className: classes.floatingLabelFocusStyle
          }} 
          />
        </Grid>
        <Grid item>
        <TextField id="outlined-basic" 
          label="Password" 
          value={loginDetails.password} 
          onChange={(event) => handleInput("password", event.target.value)}
          type="password"
          variant="outlined"
          className={classes.inputBox}
          InputProps={{
            className: classes.input
          }}
          InputLabelProps={{
            className: classes.floatingLabelFocusStyle
          }} 
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleLogin()}
            className={classes.submitButton}
          >
            LOGIN
          </Button>
        </Grid>
        <Grid item>
          <Link href="/signup" variant="body2" className={classes.Link}>
                  Don't have an account? Sign Up
          </Link>
          </Grid>
      </Grid>
      </Card>
  );
};

export default Login;
