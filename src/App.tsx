import {
  Button,
  Container,
  Grid,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
//import axios from "./mongoDBService";
//import { dbClient } from "./mongoDBService";
import { openAIResponse } from "./openaiService";

//add to local storage settings data with react hooks?
//connect to mongoDB and store results we want to save
//create page where we review saved data
//add categories...
//search within category and all saved data

//dbClient();
//axios()
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  logoContainer: {
    marginTop: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    maxHeight: "75px",
  },
  textField: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  disclaimer: {
    marginTop: theme.spacing(2),
    color: theme.palette.error.main,
  },
}));

const App = (): JSX.Element => {
  const classes = useStyles();
  const [promptText, setPromptText] = useState<string>("");
  //const [payload, setPayload] = useState<CompletionPayload>({});

  const changePromptHandler = (e: any) => {
    setPromptText(e.target.value);
  };

  const submitHandler = async () => {
    //const pl = { ...payload, prompt: promptText };
    //setPayload(pl);
    const answer = await openAIResponse(promptText)
    setPromptText(`${promptText + answer}`);
  };

  // const responseHandler = (openAIResponse: CompletionResponse) => {
  //   setPromptText(`${promptText + openAIResponse.choices[0].text}`);
  // };

  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Container className={classes.logoContainer} maxWidth="sm">
         <h1>AskAI</h1> 
        </Container>
      </Grid>
      <Grid item xs={12}>
        <Container maxWidth="sm">
          <TextField
            className={classes.textField}
            label="Enter text and submit to get a completion"
            multiline
            minRows={10}
            value={promptText}
            onChange={(e) => changePromptHandler(e)}
            variant="outlined"
          />
          <Button
            onClick={() => submitHandler()}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
          <Typography
            className={classes.disclaimer}
            variant="subtitle2"
            component="h2"
          >
          </Typography>
        </Container>
      </Grid>
    </Grid>
  );
};

export default App;