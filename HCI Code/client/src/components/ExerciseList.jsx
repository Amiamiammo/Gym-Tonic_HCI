import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import API from '../API';
import { useNavigate } from 'react-router-dom';



export default function ExerciseList(props) {
  const { exercises, setMessage } = props;

  const navigate = useNavigate();

  const [dailyTrainingExercises, setDailyTrainingExercises] = React.useState([]);

  React.useEffect(() => {
    async function getDailyTrainingExercises() {
      try {
        const dailyTrainingExercises = await API.getDailyTraining();
        setDailyTrainingExercises(dailyTrainingExercises);
      } catch (err) {
        console.error('Error fetching daily training exercises', err);
      }
    }
    getDailyTrainingExercises();
  }, []);

  const removeFromDailyTraining = async (idexercise) => {
    try {
      const result = await API.removeExerciseDailyTraining(idexercise);
      const exercises = dailyTrainingExercises.filter(e => e.idex !== idexercise);
      setDailyTrainingExercises(exercises);
      setMessage("Exercise deleted from your daily training");
    } catch (err) {
      console.error('Error removing exercise from daily training', err);
    }
  };

  const addToDailyTraining = async (idexercise) => {
    try {
      await API.addExerciseDailyTraining(idexercise);
      const exercise = exercises.find(e => e.idex === idexercise);
      setDailyTrainingExercises([...dailyTrainingExercises, exercise]);
      setMessage("Exercise added to your daily training");
    } catch (err) {
      console.error('Error adding exercise to daily training', err);
    }
  };

  const handleExerciseClick = (idex) => {
    navigate(`/exercises/${idex}`)
  };

  function generate(element) {
    return exercises.map((exercise, index) =>
      React.cloneElement(element, {
        key: index,
        children: React.cloneElement(element.props.children, {
          primary: exercise.exname,
          onClick: () => {
            handleExerciseClick(exercise.idex)
          }
        }),
        secondaryAction: (
          <IconButton edge="end" aria-label="delete"
            onClick={() => {
              dailyTrainingExercises.some((dailyExercise) => dailyExercise.idex === exercise.idex) ?
                removeFromDailyTraining(exercise.idex)
                :
                addToDailyTraining(exercise.idex)
            }}>
            {dailyTrainingExercises.some((dailyExercise) => dailyExercise.idex === exercise.idex) ? <DeleteIcon style={{ color: '#a30000' }} /> : <AddIcon style={{ color: '#1b998b' }}
            />}
          </IconButton>
        ),
      })
    );
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <List>
          {generate(
            <ListItem sx={{ boxShadow: 1 }}>
              <ListItemText primary="Single-line item" />
            </ListItem>
          )}
        </List>
      </nav>
    </Box>
  );
}