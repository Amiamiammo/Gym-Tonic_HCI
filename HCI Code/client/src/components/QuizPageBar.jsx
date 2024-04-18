import * as React from 'react';
import { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import MuiAppBar from '@mui/material/AppBar';
import { Button, Box, Typography, IconButton, Dialog, DialogContent, DialogContentText } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const GridItem = ({ xs, children, ...props }) => (
    <Grid xs={xs} container alignItems="center" {...props}>
        <Typography color="inherit" noWrap sx={{ flexGrow: 1 }}>
            {children}
        </Typography>
    </Grid>
);

const HelpDialog = ({ open, handleClose, navigate, submitted }) => (
    <Dialog open={open} onClose={handleClose}>
        <DialogContent align='center'>
            {submitted ? (
                <DialogContentText sx={{ fontSize: 20 }}>
                    {"Going back will result in the report being inaccesible."}
                    <br /><br />
                    {"Do you want to proceed?"}
                    <br /><br />
                </DialogContentText>
            ) : (
                <DialogContentText sx={{ fontSize: 20 }}>
                    {"If you go back all your changes will be lost."}
                    <br /><br />
                    {"Do you want to proceed?"}
                    <br /><br />
                </DialogContentText>
            )}
            <Button sx={{ fontSize: 17 }} onClick={() => navigate(`/quiz`)}>Yes</Button>
            <Button sx={{ fontSize: 17 }} onClick={handleClose}>No</Button>
        </DialogContent>
    </Dialog>
);

export default function QuizChestBar(props) {

    const { quizId, questionsToPass, submitted } = props;
    const [title, setTitle] = useState();
    const [questionNumber, setQuestionNumber] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        if (quizId == 1) {
            setTitle("Chest");
            setQuestionNumber(10);
        } else if (quizId == 3) {
            setTitle("Back");
            setQuestionNumber(5);
        }
    }
    );

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
                    <Box sx={{ width: '100%' }}>
                        <Grid container spacing={1.5} sx={{ marginTop: 1 }} >
                            <GridItem xs={2} alignItems="center" >
                                <IconButton color="inherit" onClick={handleClickOpen}>
                                    <ArrowBackIcon />
                                </IconButton>
                                <HelpDialog open={open} handleClose={handleClose} navigate={navigate} submitted={submitted} />
                            </GridItem>
                            <Grid xs={8} alignItems="center" >
                                <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1, fontWeight: 'bold', fontSize: 25 }}> {title} </Typography>
                            </Grid>
                            <Grid xs={2} alignItems="center" >
                            </Grid>
                            <GridItem xs={12} sx={{ marginBottom: 2 }}>
                                {submitted ? (
                                    <Typography component="span" variant="subtitle1" color="inherit" sx={{ textAlign: 'center', whiteSpace: 'normal', fontSize: 18 }}>
                                        {`Report`}
                                    </Typography>
                                ) : (
                                    <Typography component="span" variant="subtitle1" color="inherit" sx={{ textAlign: 'center', whiteSpace: 'normal', fontSize: 17 }}>
                                        {`Answer ${questionsToPass}/${questionNumber} questions correctly to pass`}
                                    </Typography>
                                )}
                            </GridItem>
                        </Grid>
                    </Box>
                </Toolbar>
            </MuiAppBar>
        </Box>
    );
}
