import { CheckCircleOutlineOutlined, HighlightOffOutlined } from '@mui/icons-material';
import { Box, Chip, Grid, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { useEffect, useState } from 'react';
import QuizAppBar from './QuizAppBar';
import API from '../API';
import { useNavigate } from 'react-router-dom';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';

const Item = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
  padding: theme.spacing(1),
  textAlign: 'center',
}));

function QuizStatus({ idQuiz, passed, numdone, unlockat, newQuiz}) {

  const navigate = useNavigate();

  if (numdone >= unlockat) {
    if (newQuiz) {
      return (
        <Stack>
          <Chip
            label="New"
            icon={<AutoAwesomeOutlinedIcon style={{ color: '#ff8600' }} />}
            variant="outlined"
            size='medium'
            sx={{ color: '#ff8600', backgroundColor: 'white', borderColor: '#ff8600' }}
          />
          {idQuiz === 1 || idQuiz === 3 ? (
            <Button variant='contained' size='medium' sx={{marginTop: 1}} onClick={() => navigate(`/quiz/${idQuiz}`)}>Try now</Button>
          ) : (
            <Button variant='contained' size='medium' sx={{marginTop: 1}} >Try now</Button>
          )}
        </Stack>
      );
    } else {
      return (
        <Stack>
          {passed ? (
            <Chip
              label="Passed"
              icon={<CheckCircleOutlineOutlined />}
              variant="outlined"
              size='medium'
              sx={{ color: '#1b998b', backgroundColor: 'white', borderColor: '#1b998b' }}
            />
          ) : (
            <Chip
              label="Not Passed"
              icon={<HighlightOffOutlined />}
              variant="outlined"
              size='medium'
              sx={{ color: '#A30000', backgroundColor: 'white', borderColor: '#A30000' }}
            />
          )}
          {idQuiz === 1 || idQuiz === 3 ? (
            <Button variant='contained' size='medium' sx={{marginTop: 1}} onClick={() => navigate(`/quiz/${idQuiz}`)}>Try now</Button>
          ) : (
            <Button variant='contained' size='medium' sx={{marginTop: 1}}>Try now</Button>
          )}
        </Stack>
      );
    }
  } else {
    return <Typography align='center'>Unlock at {unlockat} ex.</Typography>;
  }
}

export default function Quiz() {

  const [muscleGroups, setMuscleGroups] = useState([]);
  const [userLevel, setUserLevel] = useState([]);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const init = async () => {
      try {
        const muscleGroupsToLoad = await API.getMuscleGroups();
        const userLevelToLoad = await API.getUserLevel();
        const quizzesToLoad = await API.getAllQuizzes();
        setMuscleGroups(muscleGroupsToLoad);
        setUserLevel(userLevelToLoad);
        setQuizzes(quizzesToLoad);
      }
      catch (err) {
        console.log(err);
      }
    };
    init();
  }, []);

  return (
    <Item sx={{ overflowY: "scroll", maxHeight: '95vh', width: '100%' }}>
      <Box sx={{ width: '100%' }}>
        <Stack spacing={10}>
          <Item>
            <QuizAppBar title="Quiz" userLevel={userLevel} />
          </Item>
          <Item>
            <Stack>
              {quizzes.map((quiz) => {
                const muscleGroup = muscleGroups.find(group => group.idmusclegroup == quiz.idmusclegroup);
                if (muscleGroup) {
                  const label = `${muscleGroup.numdone}/${quiz.unlockat} exercises done`;

                  return (
                    <ListItem key={quiz.idquiz} sx={{ boxShadow: 1 }}>
                      <Grid container alignItems="center">
                        <Grid item xs={7}>
                          <ListItemText
                            primary={<Typography variant="body2">{label}</Typography>}
                            secondary={<Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: 18, color: '#050609' }}>{muscleGroup.musclegroup}</Typography>}
                          />
                        </Grid>
                        <Grid item xs={5}>
                          <QuizStatus idQuiz={quiz.idquiz} passed={quiz.passed} numdone={muscleGroup.numdone} unlockat={quiz.unlockat} newQuiz={quiz.new} />
                        </Grid>
                      </Grid>
                    </ListItem>
                  );
                }
              })}
            </Stack>
          </Item>
        </Stack>
      </Box>
    </Item>
  );
}
