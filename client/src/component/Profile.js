import { useContext, useEffect, useState } from "react";
import { Button, Grid, Typography, Card, makeStyles, TextField } from "@material-ui/core";
import axios from "axios";
import ChipInput from "material-ui-chip-input";
import FileUploadInput from "../lib/FileUploadInput";
import DescriptionIcon from "@material-ui/icons/Description";
import { SetPopupContext } from "../App";
import apiList from "../lib/apiList";

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
  const [userData, setUserData] = useState();
  const [open, setOpen] = useState(false);

  const [profileDetails, setProfileDetails] = useState({
    name: "",
    skills: [],
    resume: "",
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

  const handleClose = () => {
    setOpen(false);
  };

  const editDetails = () => {
    setOpen(true);
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
    setOpen(false);
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
                <ChipInput
                  className={classes.inputBox}
                  label="Skills"
                  variant="outlined"
                  helperText="Press enter to add skills"
                  value={profileDetails.skills}
                  onAdd={(chip) =>
                    setProfileDetails({
                      ...profileDetails,
                      skills: [...profileDetails.skills, chip],
                    })
                  }
                  onDelete={(chip, index) => {
                    let skills = profileDetails.skills;
                    skills.splice(index, 1);
                    setProfileDetails({
                      ...profileDetails,
                      skills: skills,
                    });
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
                <FileUploadInput
                  className={classes.inputBox}
                  label="Resume (.pdf)"
                  icon={<DescriptionIcon />}
                  uploadTo={apiList.uploadResume}
                  handleInput={handleInput}
                  identifier={"resume"}
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
                  className={classes.submitButton}
                  onClick={() => handleUpdate()}
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
