
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import API from './API';
import './App.css';
import DailyTraining from './components/DailyTraining';
import Exercise from './components/Exercise';
import Exercises from './components/Exercises';
import FixedBottomNavigation from './components/FixedBottomNavigation';
import Homepage from './components/Homepage';
import Quiz from './components/Quiz';
import QuizPage from './components/QuizPage';

function DefaultRoute() {
  return (
    <Container className='App'>
      <h1>Route errata</h1>
      <Link to='/'>Tornare alla Home Page</Link>
    </Container>
  );
}

const defaultTheme = createTheme();

function App() {


  const [muscleGroups, setMuscleGroups] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [message, setMessage] = useState('');


    // If an error occurs, the error message will be shown in a toast.
    const handleErrors = (err) => {
      let msg = '';
      if (err.error) msg = err.error;
      else if (String(err) === "string") msg = String(err);
      else msg = "Unknown Error";
      setMessage(msg); // WARN: a more complex application requires a queue of messages. In this example only last error is shown.
    }

    useEffect(() => {
      const init = async () => {
        try {
            const muscleGroupsToLoad = await API.getMuscleGroups();
            const exercisesToLoad = await API.getAllExercises();
            setMuscleGroups(muscleGroupsToLoad);
            setExercises(exercisesToLoad);
          }
        catch (err) {
          handleErrors(err);
        }
      };
      init();
    }, []);

  return (
    <BrowserRouter>

    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Routes>
      <Route path='/' element={<Homepage muscleGroups={muscleGroups} exercises={exercises} />} />
      <Route path='/exercises' element={<Exercises muscleGroups={muscleGroups} exercises={exercises}/>} />
      <Route path='/exercises/:id' element={<Exercise muscleGroups={muscleGroups} exercises={exercises} />} />
      <Route path='/dailytraining' element={<DailyTraining muscleGroups={muscleGroups}
      exercises={exercises} />} />
      <Route path='/quiz' element={<Quiz/>} />
      <Route path='/quiz/:id' element={<QuizPage />} />
      <Route path='*' element={<DefaultRoute />} />
    </Routes>
          <FixedBottomNavigation/>
      </Box>
    </ThemeProvider>
    </BrowserRouter>
  );
}

export default App

