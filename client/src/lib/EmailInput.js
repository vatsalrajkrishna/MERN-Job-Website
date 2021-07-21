import { TextField, makeStyles } from "@material-ui/core";
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

const EmailInput = (props) => {
  const {
    label,
    value,
    onChange,
    inputErrorHandler,
    handleInputError,
    required,
    className,
  } = props;
  const classes = useStyles();
  return (
    <TextField
      label={label}
      variant="outlined"
      value={value}
      onChange={onChange}
      helperText={inputErrorHandler.email.message}
      onBlur={(event) => {
        if (event.target.value === "") {
          if (required) {
            handleInputError("email", true, "Email is required");
          } else {
            handleInputError("email", false, "");
          }
        } else {
          const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (re.test(String(event.target.value).toLowerCase())) {
            handleInputError("email", false, "");
          } else {
            handleInputError("email", true, "Incorrect email format");
          }
        }
      }}
      error={inputErrorHandler.email.error}
      className={className}
      InputProps={{
        className: classes.input
      }}
      InputLabelProps={{
        className: classes.floatingLabelFocusStyle
      }} 
    />
  );
};

export default EmailInput;
