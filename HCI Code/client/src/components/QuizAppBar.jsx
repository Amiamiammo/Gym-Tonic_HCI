import * as React from 'react';
import { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import MuiAppBar from '@mui/material/AppBar';
import { Box, Typography, IconButton, Dialog, DialogContent, DialogContentText } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import LinearProgress from '@mui/material/LinearProgress';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const GridItem = ({ xs, children, ...props }) => (
  <Grid xs={xs} container alignItems="center" {...props}>
    <Typography color="inherit" noWrap sx={{ flexGrow: 1 }}>
      {children}
    </Typography>
  </Grid>
);

const HelpDialog = ({ open, handleClose }) => (
  <Dialog open={open} onClose={handleClose} >
    <Typography variant="h4" component="div" sx={{ flexGrow: 1, textAlign: 'center', fontWeight: 'bold', marginTop: 2 }}>
      Help
    </Typography>
    <DialogContent sx={{ textAlign: 'center' }}>
      <DialogContentText sx={{ typography: 'body1', fontWeight: 'medium', fontSize: 17 }} >
        {"Complete all the Quizzes to reach the final level:"}
      </DialogContentText>
      <img src="\badge4.svg" alt="MaxLv" style={{ width: '40%', height: 'auto' }} />
      <Typography variant="h4" component="div" sx={{ flexGrow: 1, textAlign: 'center', fontWeight: 'bold' }}>
        How:
      </Typography>
      <DialogContentText sx={{ typography: 'body1', fontWeight: 'medium', fontSize: 17 }} >
        <br />
        {"Complete a certain number of exercises belonging to the same muscle group to unlock a specific Quiz."}
        <br /><br />
      </DialogContentText>
      <Typography sx={{ typography: 'body1', fontWeight: 'bold', fontSize: 17 }}>
        {"Complete one quiz"}
      </Typography>
      <DialogContentText sx={{ typography: 'body1', fontWeight: 'medium', fontSize: 17 }} >
        {"by answering correctly to increase your current level."}
        <br /><br />
        {"You can try a quiz any number of times, even if you have already passed it."}
      </DialogContentText>
    </DialogContent>
  </Dialog>
);

function UserTitle({ userLevel }) {

  if (userLevel.level >= 0 && userLevel.level <= 4) {
    return (
      <GridItem xs={8} sx={{ marginBottom: 2 }}>
        Beginner
      </GridItem>
    );
  }
  else if (userLevel.level >= 5 && userLevel.level <= 9) {
    return (
      <GridItem xs={8} sx={{ marginBottom: 2 }}>
        Determined Athlete
      </GridItem>
    );
  }
  else if (userLevel.level >= 10 && userLevel.level <= 14){
    return (
      <GridItem xs={8} sx={{ marginBottom: 2 }}>
        Master Of Endurance
      </GridItem>
    );
  }
  else {
    return (
      <GridItem xs={8} sx={{ marginBottom: 2 }}>
        Fitness Champion
      </GridItem>
    );
  }

}

const levelBarTheme = createTheme({
  palette: {
    customColor: {
      main: '#ff8600',
    },
  },
});

export default function QuizAppBar(props) {
  const { title, userLevel } = props;
  const progress = (userLevel.level / 5) * 100;

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <MuiAppBar>
        <Toolbar sx={{ minHeight: 100, height: 100 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
              <GridItem xs={2} />
              <Grid xs={8} container alignItems="center" sx={{ marginTop: 1 }}>
                <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1, fontSize: 25 }}> {title} </Typography>
              </Grid>
              <Grid xs={2} container alignItems="center" sx={{ marginTop: 0.5 }}>
                <IconButton color="inherit" onClick={handleClickOpen}>
                  <InfoOutlinedIcon fontSize='large'/>
                </IconButton>

                <HelpDialog open={open} handleClose={handleClose} />

              </Grid>
              <GridItem xs={3}>Level:</GridItem>
              <GridItem xs={6}>
              <ThemeProvider theme={levelBarTheme}>
                <LinearProgress variant="determinate" value={progress} sx={{ height: '10px' }} color="customColor" />
              </ThemeProvider>
              </GridItem>
              <GridItem xs={3}>{userLevel.level}</GridItem>
              <GridItem xs={2} />
              <UserTitle userLevel={userLevel}/>
              <GridItem xs={2} />
            </Grid>
          </Box>
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
}
