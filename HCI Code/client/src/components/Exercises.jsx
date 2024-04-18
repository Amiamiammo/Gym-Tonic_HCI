import * as React from 'react';
import Stack from '@mui/system/Stack';
import MyAppBar from './MyAppBar';
import NestedList from './NestedListMuscleGroups';
import styled from '@mui/system/styled';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Snackbar } from '@mui/material';
import { Alert } from '@mui/material';
import Slide from '@mui/material/Slide';

const Item = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    borderColor: theme.palette.mode === 'dark' ? '#444d58' : '#ced7e0',
    padding: theme.spacing(1),
    textAlign: 'center',
  }));

export default function Exercises(props) {


  const {muscleGroups, exercises} = props;

  const [message, setMessage] = useState('');
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  return (
      <> 
      <Stack spacing={10}>

        <Item><MyAppBar title="Exercises" /></Item>
        <Item sx={{ paddingBottom: '30px', overflowY: 'auto', maxHeight: '75vh', position: 'fixed', top: '5px', width: '100%' }}>
          <NestedList muscleGroups={muscleGroups} exercises={exercises}
            isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} message={message} setMessage={setMessage} />
        </Item>
        <Item style={{ position: 'fixed', bottom: '80px', width: '100%', textAlign: 'center', paddingTop: '10px' }}>

            <Typography fontWeight="bold" fontSize={20}>
              Tap on one muscle group to get related exercises
            </Typography>

        </Item>
      </Stack>
      {message && (
        <Snackbar
          open={Boolean(message)}
          autoHideDuration={1500}
          onClose={() => setMessage('')}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          TransitionComponent={Slide}
        >
          <Alert onClose={() => setMessage('')} severity="success">
            {message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}
