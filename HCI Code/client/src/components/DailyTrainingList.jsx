import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import { Delete } from '@mui/icons-material';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import API from '../API';
import { Button, Typography } from '@mui/material';
import { shadows } from '@mui/system';


const BlinkingListItem = styled(ListItem)(({ theme }) => ({
  animation: `blinking 0.7s linear infinite`,
  '@keyframes blinking': {
    '0%': { opacity: 1 },
    '50%': { opacity: 0 },
    '100%': { opacity: 1 },
  },
}));


export default function DailyTrainingList(props) {

  const { dirty, setDirty, setSwapOpen, setSwapMuscleGroup, setSwapExAvailable,
    exercises, muscleGroups, setIdDaily, setMessage } = props;

  const [toRemove, setToRemove] = React.useState(0);
  const [dailyTraining, setDailyTraining] = React.useState([]);


  const navigate = useNavigate();
  const toRemoveRef = useRef(toRemove);
  const timeoutIdRef = useRef(null);

  useEffect(() => {
    toRemoveRef.current = toRemove; // Update the ref whenever toRemove changes
  }, [toRemove]);

  useEffect(() => {
    setDirty(true);
  }, []);

  useEffect(() => {
    if (dirty) {
      const init = async () => {
        try {
          const dailyTrainingToLoad = await API.getDailyTraining();
          setDailyTraining(dailyTrainingToLoad);
        }
        catch (err) {
          console.log(err);
        }
      };
      init();
      setDirty(false);
    }
  }, [dirty]);


  const handleExerciseClick = (idex) => {
    navigate(`/exercises/${idex}`)
  };

  const handleToggle = (value) => async () => {
    const result = await API.tickExerciseDailyTraining(value);
    setDirty(true);
    if (result.ticked)
      setMessage("Marked as done!");
  };

  return (
    dailyTraining.length !== 0 ?
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {dailyTraining.map((exercise) => {
          const labelId = `checkbox-list-label-${exercise.idex}`;

          return (
            toRemove === exercise.idex ?
              <BlinkingListItem

                sx={{ boxShadow: 1 }}
                key={exercise.idex}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                <Button onClick={() => {
                  setToRemove(0);
                  clearTimeout(timeoutIdRef.current);
                }}>UNDO</Button>
              </BlinkingListItem>
              :
              <ListItem
                sx={{ boxShadow: 1 }}
                key={exercise.idex}
                secondaryAction={
                  <>
                    <IconButton edge={false} aria-label="delete" onClick={
                      () => {
                        /* find muscle group */
                        const muscleGroup = muscleGroups.find(m => m.idmusclegroup === exercise.idmusclegroup);
                        const exavailable = exercises.filter(e => e.idmusclegroup === muscleGroup.idmusclegroup).filter(
                          e => !dailyTraining.some(d => d.idex === e.idex)
                        );
                        setSwapMuscleGroup(muscleGroup.musclegroup);
                        setSwapExAvailable(exavailable);
                        setSwapOpen(true);
                        setIdDaily(exercise.iddaily);
                      }
                    }>
                      <ChangeCircleOutlinedIcon fontSize={'medium'} style={{ color: '#1565c0' }} />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={async () => {
                      setToRemove(exercise.idex);
                      timeoutIdRef.current = setTimeout(async () => {
                        if (toRemoveRef.current) {
                          await API.removeExerciseDailyTraining(exercise.idex);
                          setDirty(true);
                          setToRemove(0);
                          setMessage("Exercise deleted from your daily training");
                        }
                      }, 2000);
                    }}>
                      <Delete style={{ color: '#a30000' }} />
                    </IconButton>
                  </>
                }
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={exercise.done === 1 ? true : false}
                    tabIndex={-1}
                    onChange={handleToggle(exercise.idex)}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                    style={{ color: '#1b998b' }}
                  />
                </ListItemIcon>
                <ListItemButton role={undefined} onClick={() => handleExerciseClick(exercise.idex)} dense>
                  <ListItemText id={labelId} primary={exercise.exname} />
                </ListItemButton>
              </ListItem>
          );
        })}
      </List> : 
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <Typography align='center' fontWeight="bold" fontSize={20}>
        Your Daily Training is empty
      </Typography>
      </div>
  );
}