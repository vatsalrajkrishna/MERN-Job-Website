import { useContext, useEffect, useState } from "react";
import { Button, Grid, Typography, Card, makeStyles, TextField } from "@material-ui/core";
import axios from "axios";
import { SetPopupContext } from "../../App";

import apiList from "../../lib/apiList";

const useStyles = makeStyles((theme) => ({
  body: {
    height: "inherit",
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
  },
}));

const Profile = (props) => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);

  const [profileDetails, setProfileDetails] = useState({
    name: "",
    bio: "",
  });

  const handleInput = (key, value) => {
    setProfileDetails({
      ...profileDetails,
      [key]: value,
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(apiList.user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setProfileDetails(response.data);
      })
      .catch((err) => {
        console.log(err.response.data);
        setPopup({
          open: true,
          severity: "error",
          message: "Error",
        });
      });
  };

  const handleUpdate = () => {
    let updatedDetails = {
      ...profileDetails,
    };

    axios
      .put(apiList.user, updatedDetails, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setPopup({
          open: true,
          severity: "success",
          message: response.data.message,
        });
        getData();
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
        console.log(err.response);
      });
  };

  return (
    <>
          <Card className={classes.body} style={{  padding: "20px", border: "none", boxShadow: "none" }} >
            <Grid container direction="column" spacing={4} alignItems="center">
            <img src={'../../user-profile.JPG'} height="70" />
              <Grid item>
                <Typography variant="h4" component="h2">
                  PROFILE
                </Typography>
              </Grid>
              <Grid item>
                <TextField
                  label="Name"
                  value={profileDetails.name}
                  onChange={(event) => handleInput("name", event.target.value)}
                  className={classes.inputBox}
                  variant="outlined"
                  InputProps={{
                    className: classes.input
                  }}
                  InputLabelProps={{
                    className: classes.floatingLabelFocusStyle
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  label="Bio (upto 250 words)"
                  multiline
                  rows={8}
                  variant="outlined"
                  value={profileDetails.bio}
                  className={classes.inputBox}
                  onChange={(event) => {
                    if (
                      event.target.value.split(" ").filter(function (n) {
                        return n != "";
                      }).length <= 250
                    ) {
                      handleInput("bio", event.target.value);
                    }
                  }}
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
                  onClick={() => handleUpdate()}
                  className={classes.submitButton}
                  >
                  Update Details
                </Button>
              </Grid>
            </Grid>
          </Card>
    </>
  );
};

export default Profile;
