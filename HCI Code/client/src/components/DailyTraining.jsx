import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/system/Stack';
import Box from '@mui/material/Box';
import DailyTrainingList from './DailyTrainingList';
import { Badge, Alert, Snackbar } from '@mui/material';
import { Dialog, DialogContent, DialogContentText } from '@mui/material';
import SwapExercise from './SwapExercise';
import { Button } from '@mui/material';
import API from '../API';
import DailyTrainingAppBar from './DailyTrainingAppBar';
import Slide from '@mui/material/Slide';


const Item = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
  padding: theme.spacing(1),
  textAlign: 'center',
}));

export default function DailyTraining(props) {

  const { exercises, muscleGroups } = props;

  const [message, setMessage] = React.useState('');

  const [dirty, setDirty] = React.useState(true);

  const [open, setOpen] = React.useState(false);

  const [idDaily, setIdDaily] = React.useState(0);

  const [swapOpen, setSwapOpen] = React.useState(false);

  const [swapMuscleGroup, setSwapMuscleGroup] = React.useState("");

  const [swapExAvailable, setSwapExAvailable] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRemoveAll = async () => {
    await API.removeAllExercisesDailyTraining();
    setDirty(true);
    handleClose();
  };

  return (
    <>
      <Box sx={{ width: '100%', overflowY: "scroll", maxHeight: '95vh' }}>
        <Stack
          spacing={10}>
          <Item><DailyTrainingAppBar title="Daily training" /></Item>
          <Item sx={{ overflowY: "scroll", minHeight: "250px", maxHeight: "95vh" }}
            container>  <DailyTrainingList dirty={dirty} setDirty={setDirty}
              exercises={exercises}
              muscleGroups={muscleGroups}
              setSwapOpen={setSwapOpen}
              setSwapMuscleGroup={setSwapMuscleGroup}
              setSwapExAvailable={setSwapExAvailable}
              setIdDaily={setIdDaily}
              setMessage={setMessage}
            /></Item>
          <SwapExercise swapOpen={swapOpen} setSwapOpen={setSwapOpen}
            musclegroup={swapMuscleGroup} exavailable={swapExAvailable} idDaily={idDaily}
            setDirty={setDirty} setMessage={setMessage} />
          <Item style={{ position: 'fixed', bottom: '80px', width: '100%', textAlign: 'center', paddingTop: '10px' }}>

            <Button variant="contained" onClick={handleClickOpen}>Remove all</Button>
            <Dialog open={open} onClose={handleClose}>
              <DialogContent align='center'>
                <DialogContentText >
                  {"All the exercises in your 'Daily Training' will be removed."}
                  <br />
                  {"Do you want to proceed?"}
                </DialogContentText>
                <Button onClick={handleRemoveAll}>Yes</Button>
                <Button onClick={handleClose}>No</Button>
              </DialogContent>
            </Dialog>


          </Item>
        </Stack>
      </Box>
      {message && (
        <Snackbar TransitionComponent={Slide} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} open={Boolean(message)} autoHideDuration={1500} onClose={() => setMessage('')}>
          <Alert onClose={() => setMessage('')} severity="success">
            {message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}
