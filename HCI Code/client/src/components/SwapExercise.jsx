import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import { List, ListItem } from '@mui/material';
import { Image } from 'mui-image';
import IconButton from '@mui/material/IconButton';
import { Grid, Box } from '@mui/material';
import API from '../API';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';




export default function SwapExercise(props) {

    const { swapOpen, setSwapOpen, musclegroup, exavailable, idDaily, setDirty, setMessage } = props;

    return (
        <Dialog open={swapOpen} onClose={() => setSwapOpen(false)}>
            <DialogTitle style={{ textAlign: 'center' }}>
                <Typography fontWeight="bold" fontSize={25}>
                    {musclegroup}
                </Typography>
            </DialogTitle>
            <DialogContent>
                { exavailable.length > 0 ? 
                <List >
                    {exavailable.map((ex, index) => (
                        <ListItem key={index}>
                            <Grid container alignItems="center">
                            <Grid item xs={6}>
                            <Typography>{ex.exname}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                            <Image src={ex.imagename} showLoading />
                            </Grid>
                            <Grid item xs={2}>
                            <IconButton edge="end" aria-label="delete" onClick={
                               async () => {
                                    await API.swapExerciseDailyTraining(ex.idex, idDaily);
                                    setSwapOpen(false);
                                    setDirty(true);
                                    setMessage('Swapped successfully!');
                                }
                              }>
                                <ChangeCircleOutlinedIcon fontSize='large' style={{ color: '#1565c0', marginLeft: 10 }} />
                              </IconButton>
                            </Grid>
                            </Grid>
                        </ListItem>
                    ))}
                </List> : 
                <Typography align='center'>All the {musclegroup} exercises are already in your daily training
                </Typography>}
            </DialogContent>
        </Dialog>
    );
}

