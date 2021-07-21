import { useContext, useState } from "react";
import { Button, Grid, Typography, Card, makeStyles, TextField, MenuItem} from "@material-ui/core";
import axios from "axios";
import ChipInput from "material-ui-chip-input";

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
    marginTop: "10px",
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
  popupDialog: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const CreateJobs = (props) => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);

  const [jobDetails, setJobDetails] = useState({
    title: "",
    deadline: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000)
      .toISOString()
      .substr(0, 16),
    skillsets: [],
    jobType: "Full Time",
    salary: 0,
  });

  const handleInput = (key, value) => {
    setJobDetails({
      ...jobDetails,
      [key]: value,
    });
  };

  const handleUpdate = () => {
    console.log(jobDetails);
    axios
      .post(apiList.jobs, jobDetails, {
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
        setJobDetails({
          title: "",
          deadline: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000)
            .toISOString()
            .substr(0, 16),
          skillsets: [],
          jobType: "Full Time",
          salary: 0,
        });
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
       <Card className={classes.body} style={{ border: "none", boxShadow: "none" }}>
      <Grid container direction="column" spacing={4} alignItems="center">
        <Grid item>
          <Typography variant="h4" component="h2">
            CREATE JOB
          </Typography>
        </Grid>
                <Grid item>
                  <TextField
                    label="Title"
                    value={jobDetails.title}
                    className={classes.inputBox}
                    onChange={(event) =>
                      handleInput("title", event.target.value)
                    }
                    variant="outlined"
                    fullWidth
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
                    value={jobDetails.skillsets}
                    onAdd={(chip) =>
                      setJobDetails({
                        ...jobDetails,
                        skillsets: [...jobDetails.skillsets, chip],
                      })
                    }
                    onDelete={(chip, index) => {
                      let skillsets = jobDetails.skillsets;
                      skillsets.splice(index, 1);
                      setJobDetails({
                        ...jobDetails,
                        skillsets: skillsets,
                      });
                    }}
                    fullWidth
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
                    select
                    label="Job Type"
                    variant="outlined"
                    className={classes.inputBox}
                    value={jobDetails.jobType}
                    onChange={(event) => {
                      handleInput("jobType", event.target.value);
                    }}
                    fullWidth
                    InputProps={{
                      className: classes.input
                    }}
                    InputLabelProps={{
                      className: classes.floatingLabelFocusStyle
                    }} 
                  >
                    <MenuItem value="Full Time">Full Time</MenuItem>
                    <MenuItem value="Part Time">Part Time</MenuItem>
                    <MenuItem value="Work From Home">Work From Home</MenuItem>
                  </TextField>
                </Grid>
                <Grid item>
                  <TextField
                    label="Salary"
                    type="number"
                    variant="outlined"
                    className={classes.inputBox}
                    value={jobDetails.salary}
                    onChange={(event) => {
                      handleInput("salary", event.target.value);
                    }}
                    InputProps={{ inputProps: { min: 0 } }}
                    fullWidth
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
                    label="Application Deadline"
                    type="datetime-local"
                    className={classes.inputBox}
                    value={jobDetails.deadline}
                    onChange={(event) => {
                      handleInput("deadline", event.target.value);
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                    fullWidth
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
                    CREATE JOB
                  </Button>
                </Grid>
              </Grid>
            </Card>
    </>
  );
};

export default CreateJobs;
