import { Grid, Typography } from "@material-ui/core";
const Welcome = (props) => {
  return (
    <div>
    <Grid
      container
      item
      direction="column"
      style={{ padding: "20px", minHeight: "93vh" }}
    >
      <Grid item>
        <Typography variant="h5">Find A Job at India's No.1 Job Site</Typography>
      </Grid>
      <img src="images/2.PNG" height="400" width="1300"/>
      <div>
        <p style={{textAlign:"justify"}}>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
          been the industry's standard dummy text ever since the 1500s, when an unknown printer took
          a galley of type and scrambled it to make a type specimen book. It has survived not only 
          five centuries, but also the leap into electronic typesetting, remaining essentially 
          unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
          Lorem Ipsum passages, and more recently with desktop publishing software like Aldus 
          PageMaker including versions of Lorem Ipsum.
        </p>
      </div>
      <div style={{display:"flex"}}>
        <img src="images/1.JPG" height="400px" width="400px" style={{margin: "15px"}}/>
        <img src="images/3.PNG" height="400px" width="400px" style={{margin: "15px"}}/>
        <img src="images/2.JPG" height="400px" width="400px" style={{margin: "15px"}}/>
      </div>
    </Grid>
    <footer style={{background:"Grey"}}>
      <span style={{marginLeft:"45%"}}>CopyRight &copy; JOB WEBSITE</span>
    </footer>
    </div>
  );
};

export const ErrorPage = (props) => {
  return (
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      justify="center"
      style={{ padding: "30px", minHeight: "93vh" }}
    >
      <Grid item>
        <Typography variant="h2" style={{color:"red"}}>ERROR 404</Typography>
      </Grid>
    </Grid>
  );
};

export default Welcome;
