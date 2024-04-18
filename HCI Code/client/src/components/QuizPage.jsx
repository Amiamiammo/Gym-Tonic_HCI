import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack,
    FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Button, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { green, red } from '@mui/material/colors';
import API from '../API';
import { useParams } from 'react-router-dom';
import QuizPageBar from './QuizPageBar';

const Item = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
    padding: theme.spacing(2),
}));

function ConfirmationDialog({ open, handleClose, handleConfirm }) {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogContent align='center'>
                <DialogContentText sx={{fontSize: 20}}>
                    {"You are going to submit your answers."}
                    <br /><br />
                    {"Do you want to proceed?"}
                    <br /><br />
                </DialogContentText>
                <Button sx={{fontSize: 17}} onClick={handleConfirm}>Submit</Button>
                <Button sx={{fontSize: 17}} onClick={handleClose}>No</Button>
            </DialogContent>
        </Dialog>
    );
}

function PassedOrNot({ correctCount, questionsToPass, answers }) {

    if (correctCount >= questionsToPass) {
        return (
            <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                {`${correctCount} / ${answers.length/4}`}
                <br />
                Passed
            </Typography>
        );
    } else {
        return (
            <Typography variant="h5" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                {`${correctCount} / ${answers.length/4}`}
                <br />
                Not Passed
            </Typography>);
    }
}

function NewLevelDialog({ open, handleClose, userLevel, increased, passed, submitted }) {

    if (userLevel === 5 && increased && passed && submitted) {

        return (
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle align='center' sx={{ fontSize: 30}}>{"Congratulations, you have reached the certified level:"}</DialogTitle>
                <DialogContent align='center' sx={{ fontWeight: 'bold', fontSize: 30 }}>
                    <img src="\badge2.svg" alt="badge2" style={{ width: '60%', height: 'auto' }}/>
                    <br /><br />
                    {"Determined Athlete"}
                </DialogContent>
            </Dialog>
        );
    } else if (userLevel === 10 && increased && passed && submitted) {
        return (
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle align='center'>{"Congratulations, you have reached the certified level:"}</DialogTitle>
                <DialogContent align='center'>
                    <img src="\badge3.svg" alt="badge3" style={{ width: '60%', height: 'auto' }}/>
                    <br /><br />
                    {"Master Of Endurance"}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        );
    } else if (userLevel === 15 && increased && passed && submitted) {
        return (
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle align='center'>{"Congratulations, you have reached the certified level:"}</DialogTitle>
                <DialogContent align='center'>
                    <img src="\badge4.svg" alt="badge4" style={{ width: '60%', height: 'auto' }}/>
                    <br /><br />
                    {"Fitness Champion"}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default function QuizPage({}) {

    const correctAnswers = {};
    const initialSelectedAnswers = {};
    const [selectedAnswers, setSelectedAnswers] = useState(initialSelectedAnswers);
    const [submitted, setSubmitted] = useState(false);
    const [open, setOpen] = useState(false);
    const [correctCount, setCorrectCount] = useState(0);
    const { id } = useParams();
    const [passed, setPassed] = useState();
    const [increased, setIncreased] = useState();
    const [questionsToPass, setQuestionsToPass] = useState(3);
    const [userLevel, setUserLevel] = useState();
    const [openNewLevelDialog, setOpenNewLevelDialog] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        const init = async () => {
            try {
                const quizToLoad = await API.getQuizInfo(id);
                const questionsToLoad = await API.getQuestions(id);
                const answersToLoad = await API.getAnswers(id);
                setPassed(quizToLoad.passed);
                setQuestions(questionsToLoad);
                setAnswers(answersToLoad);
                await API.setQuizNotNew(id);
            }
            catch (err) {
                console.log(err);
            }
        };
        init();
    }, []);

    questions.forEach(question => {
        const correctAnswer = answers.find(answer => answer.idquestion === question.idquestion && answer.correct === 1);
        if (correctAnswer) {
            correctAnswers[question.idquestion] = correctAnswer.idanswer;
        }
    });

    questions.forEach(question => {
        initialSelectedAnswers[question.idquestion] = null;
    });

    const handleNewLevelOpen = () => {
        setOpenNewLevelDialog(true);
    };

    const handleNewLevelClose = () => {
        setOpenNewLevelDialog(false);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        handleClickOpen();
    };

    const handleConfirm = async () => {

        let correctCount = 0;
        for (let question in selectedAnswers) {
            if (selectedAnswers[question] == correctAnswers[question]) {
                correctCount++;
            }
        }
        setCorrectCount(correctCount);

        if (correctCount >= questionsToPass && !passed && !increased) {
            await API.increaseUserLevel();
            setIncreased(true);
            await API.setQuizPassed(id);
            setPassed(true);
            const actualLevel = await API.getUserLevel();
            setUserLevel(actualLevel.level);
        }

        setSubmitted(true);
        handleClose();
        handleNewLevelOpen();
    };

    return (
        <Item sx={{ overflowY: "scroll", maxHeight: '96vh', width: '100%' }}>
            <Stack spacing={7}>
                <Item sx={{ textAlign: 'center' }}>
                    <QuizPageBar quizId={id} questionsToPass={questionsToPass} submitted={submitted} />
                </Item>
                <Item sx={{ pointerEvents: submitted ? 'none' : 'auto' }}>
                    <form onSubmit={handleSubmit}>
                        {questions.map((question) => (
                            <FormControl key={question.idquestion} component="fieldset" sx={{ marginTop: 2, borderBottom: '2px solid black'}}>
                                <FormLabel component="legend">
                                    <Typography variant="h6" sx={{ textAlign: 'left', fontWeight: 'bold' }}>
                                        {question.question}
                                    </Typography>
                                </FormLabel>
                                <RadioGroup name={String(question.idquestion)} onChange={handleChange} style={{ zIndex: 0 }} value={selectedAnswers[question.idquestion] || ''}>
                                    <Grid container spacing={1} alignItems="center">
                                        {answers.filter(answer => answer.idquestion === question.idquestion).map((answer) => (
                                            <Grid item xs={6} key={answer.idanswer} sx={{ marginTop: 2, marginBottom: 2}}>
                                                <FormControlLabel value={String(answer.idanswer)}
                                                    control={<Radio />}
                                                    label={answer.answer}
                                                    style={{
                                                        color: submitted && correctAnswers[question.idquestion] === answer.idanswer ? green[500] :
                                                            submitted && selectedAnswers[question.idquestion] === String(answer.idanswer) && correctAnswers[question.idquestion] !== answer.idanswer ? red[500] : undefined
                                                    }} />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </RadioGroup>
                            </FormControl>
                        ))}
                        <Item sx={{ position: 'sticky', bottom: 0, width: '100%' }} >
                            <Grid container justifyContent="center">
                                {submitted
                                    ? <PassedOrNot correctCount={correctCount} questionsToPass={questionsToPass} answers={answers}/>
                                    : (<Button type="submit" variant="contained" style={{ zIndex: 2 }}>Submit</Button>)}
                            </Grid>
                        </Item>
                    </form>
                    <ConfirmationDialog open={open} handleClose={handleClose} handleConfirm={handleConfirm} />
                    <NewLevelDialog open={openNewLevelDialog} handleClose={handleNewLevelClose} userLevel={userLevel} increased={increased} passed={passed} submitted={submitted} handleClickOpen={handleClickOpen}/>
                </Item>
            </Stack>
        </Item>
    );
}
