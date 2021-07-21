import { useState, useEffect, useContext } from "react";
import { Chip, Grid, makeStyles, Card, Typography } from "@material-ui/core";
import axios from "axios";
import { SetPopupContext } from "../App";
import apiList from "../lib/apiList";

const useStyles = makeStyles((theme) => ({
  body: {
    height: "inherit",
  },
  statusBlock: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textTransform: "uppercase",
  },
  chip: {
    backgroundColor: "LightBlue"
  },
  jobTileOuter: {
    padding: "30px",
    margin: "20px 0",
    boxSizing: "border-box",
    width: "100%",
  },
  popupDialog: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const ApplicationTile = (props) => {
  const classes = useStyles();
  const { application } = props;
  const setPopup = useContext(SetPopupContext);
  const [open, setOpen] = useState(false);

  const appliedOn = new Date(application.dateOfApplication);
  const joinedOn = new Date(application.dateOfJoining);

  const handleClose = () => {
    setOpen(false);
  };

  const colorSet = {
    applied: "#299606",
    shortlisted: "#DC851F",
    accepted: "#09BC8A",
    rejected: "#D1345B",
    deleted: "#B49A67",
    cancelled: "#FF8484",
    finished: "#4EA5D9",
  };

  return (
    <Card className={classes.jobTileOuter} elevation={3}>
      <Grid container>
        <Grid container item xs={9} spacing={1} direction="column">
          <Grid item>
            <Typography variant="h6">{application.job.title}</Typography>
          </Grid>
          <Grid item>
            {application.job.skillsets.map((skill) => (
              <Chip label={skill} style={{ marginRight: "2px" }} />
            ))}
          </Grid>
          <Grid item>Posted By: {application.recruiter.name}</Grid>
          <Grid item>Applied On: {appliedOn.toLocaleDateString()}</Grid>
          <Grid item>
            <Chip className={classes.chip} label={application.job.jobType} style={{ marginRight: "2px" }}  />
            <Chip className={classes.chip} label={"₹"+application.job.salary+"/Month"} style={{ marginRight: "2px" }} />
          </Grid>
          {application.status === "accepted" ||
          application.status === "finished" ? (
            <Grid item>Joined On: {joinedOn.toLocaleDateString()}</Grid>
          ) : null}
        </Grid>
        <Grid item container direction="column" xs={3}>
          <Grid item xs>
            <Card
              className={classes.statusBlock}
              style={{
                background: colorSet[application.status],
                color: "#ffffff",
              }}
            >
              {application.status}
            </Card>
          </Grid>
          {application.status === "accepted" ||
          application.status === "finished" ? (
            <Grid item>
            </Grid>
          ) : null}
        </Grid>
      </Grid>
    </Card>
  );
};

const Applications = (props) => {
  const setPopup = useContext(SetPopupContext);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(apiList.applications, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setApplications(response.data);
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

  return (
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      style={{ padding: "30px", minHeight: "93vh" }}
    >
      <Grid item>
        <Typography variant="h4">APPLICATIONS</Typography>
      </Grid>
      <Grid
        container
        item
        xs
        direction="column"
        style={{ width: "100%" }}
        alignItems="stretch"
        justify="center"
      >
        {applications.length > 0 ? (
          applications.map((obj) => (
            <Grid item>
              <ApplicationTile application={obj} />
            </Grid>
          ))
        ) : (
          <Typography variant="h5" style={{ textAlign: "center" }}>
            No Applications Found
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default Applications;
