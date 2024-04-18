import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/system/Stack';
import { Grid, Box } from '@mui/material';
import { Typography, Paper, List, ListItem } from '@mui/material';
import MyAppBar from './MyAppBar';
import ReactPlayer from 'react-player'
import { IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { Badge, Alert, Snackbar } from '@mui/material';
import { Add } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import API from '../API';
import Slide from '@mui/material/Slide';


const Item = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
    padding: theme.spacing(1),
    textAlign: 'center',
    display: 'flex'
}));
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export default function Exercise(props) {

    const { muscleGroups, exercises } = props;


    const navigate = useNavigate();
    const { id } = useParams();
    const exercise = exercises.find((ex) => ex.idex === parseInt(id, 10));
    const tips = exercise.tips.split('|');
    const toAvoid = exercise.toavoid.split('|');
    const muscleGroup = muscleGroups.find((mG) => mG.idmusclegroup === exercise.idmusclegroup);
    const bodypart = capitalizeFirstLetter(muscleGroup.bodypart);
    const badgeText = muscleGroup.musclegroup + " - " + bodypart;

    const [showAddIcon, setShowAddIcon] = useState(false);
    const [showDeleteIcon, setShowDeleteIcon] = useState(false);
    const [isInDailyTraining, setIsInDailyTraining] = useState(false);
    const [message, setMessage] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [dailyTraining, setDailyTraining] = useState([]);





    useEffect(() => {
        const fetchDailyTraining = async () => {
            try {
                const dailyTrainingToLoad = await API.getDailyTraining();
                setDailyTraining(dailyTrainingToLoad);
            } catch (err) {
                handleErrors(err);
            }
        }
        fetchDailyTraining();


    }, []);

    useEffect(() => {
        if (dailyTraining.find((ex) => ex.idex === parseInt(id, 10))) {
            setIsInDailyTraining(true);
            setShowAddIcon(false);
            setShowDeleteIcon(true);
        } else {
            setIsInDailyTraining(false);
            setShowAddIcon(true);
            setShowDeleteIcon(false);
        }

    }, [dailyTraining])




    const handleErrors = (err) => {
        let msg = '';
        if (err.error) msg = err.error;
        else if (String(err) === "string") msg = String(err);
        else msg = "Unknown Error";
        setMessage(msg); // WARN: a more complex application requires a queue of messages. In this example only last error is shown.
    }


    const handleClickAdd = async () => {
        try {
            await API.addExerciseDailyTraining(id);
            setShowAddIcon(false);
            setShowDeleteIcon(true);
            setIsInDailyTraining(true);
            setMessage("Exercise added to your daily training");

        } catch (err) {
            handleErrors(err);
        }
    };

    const handleClickDelete = async () => {
        try {
            await API.removeExerciseDailyTraining(id);
            setShowAddIcon(true);
            setShowDeleteIcon(false);
            setIsInDailyTraining(false);
            setMessage("Exercise deleted from your daily training");

        } catch (err) {
            handleErrors(err);
        }


    };


    return (
        <>

            <Box sx={{
                width: '100%',
                height: '100vh', // Imposta l'altezza della pagina
                overflowY: 'auto', // Abilita la scrollbar verticale se necessario

            }}>
                <Stack
                    spacing={10}>
                    <Item><MyAppBar title="Exercise" /></Item>
                    <Item>
                        <Grid container>
                            <Grid item xs={2}>
                                <IconButton sx={{ marginTop: 1 }} onClick={() => {
                                    navigate(-1);
                                }}>
                                    <ArrowBack />
                                </IconButton>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h6" align="center" fontWeight={'bold'} marginTop={1.5}>
                                    {exercise.exname}

                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Badge color="secondary"
                                    sx={{
                                        fontSize: '1rem',
                                        marginTop: 3.5,
                                        marginLeft: 2, // Modifica il valore per regolare la dimensione del testo
                                    }}
                                    badgeContent={muscleGroup.musclegroup} />
                            </Grid>
                            <Grid item xs={2}>
                                {(showAddIcon && !isInDailyTraining) ? (
                                    <IconButton sx={{ marginTop: 1 }} onClick={handleClickAdd}>
                                        <Add style={{ color: '#1b998b' }}
                                        />
                                    </IconButton>
                                ) : null}


                                {(showDeleteIcon || isInDailyTraining) ? (
                                    <IconButton sx={{ marginTop: 1 }} onClick={handleClickDelete}>
                                        <DeleteIcon style={{ color: '#a30000' }} />
                                    </IconButton>
                                ) : null}
                            </Grid>
                        </Grid>
                    </Item>
                    <Item>

                        <ReactPlayer url={exercise.link_url} />

                    </Item>
                    <Item style={{ overflowY: 'auto', maxHeight: '60vh', marginBottom: '5px' }}>
                        <Paper elevation={3} style={{ padding: '20px', height: '100%' }}>
                            <Typography variant="h6" gutterBottom align="center" fontWeight={'bold'} color={'#1b998b'}>
                                TIPS
                            </Typography>
                            <List >
                                {tips.map((tip, index) => (
                                    <ListItem key={index}>
                                        <Typography>{tip}</Typography>
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </Item>

                    <Item style={{ overflowY: 'auto', maxHeight: '60vh', marginBottom: '50px' }}>
                        <Paper elevation={3} style={{ padding: '20px', height: '100%' }}>
                            <Typography variant="h6" gutterBottom align="center" fontWeight={'bold'} color={'#A30000'}>
                                TO AVOID
                            </Typography>
                            <List >
                                {toAvoid.map((toavoid, index) => (
                                    <ListItem key={index}>
                                        <Typography>{toavoid}</Typography>
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
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