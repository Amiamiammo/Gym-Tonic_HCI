import * as React from 'react';
import { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import MuiAppBar from '@mui/material/AppBar';
import { Box, Typography, IconButton, Dialog, DialogContent, DialogContentText, ListItemIcon, List, ListItem } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined';
import DeleteIcon from '@mui/icons-material/Delete';

const GridItem = ({ xs, children, ...props }) => (
  <Grid xs={xs} container alignItems="center" {...props}>
    <Typography color="inherit" noWrap sx={{ flexGrow: 1 }}>
      {children}
    </Typography>
  </Grid>
);

const HelpDialog = ({ open, handleClose }) => (
  <Dialog open={open} onClose={handleClose} >
    <Typography variant="h4" component="div" sx={{ flexGrow: 1, textAlign: 'center', fontWeight: 'bold', marginTop: 2 }}>
      Help
    </Typography>
    <DialogContent sx={{ textAlign: 'center' }}>
      <List>
        <ListItem>
          <ListItemIcon>
            <CheckBoxOutlineBlankIcon style={{ color: '#1b998b' }}
            />
          </ListItemIcon>

          <DialogContentText sx={{ typography: 'body1', textAlign: 'left' }}>
            {":"}
          </DialogContentText>

          <DialogContentText sx={{ typography: 'body1', textAlign: 'left', marginLeft: '20px' }}>
            {"All the exercises that you add to your daily routine have a checkbox"}
          </DialogContentText>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <CheckBoxIcon style={{ color: '#1b998b' }}
            />
          </ListItemIcon>

          <DialogContentText sx={{ typography: 'body1', textAlign: 'left' }}>
            {":"}
          </DialogContentText>

          <DialogContentText sx={{ typography: 'body1', textAlign: 'left', marginLeft: '20px' }}>
            {"If you have already executed an exercise, mark it as done!"}
          </DialogContentText>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <ChangeCircleOutlinedIcon style={{ color: '#1565c0' }} />
          </ListItemIcon>

          <DialogContentText sx={{ typography: 'body1', textAlign: 'left' }}>
            {":"}
          </DialogContentText>

          <DialogContentText sx={{ typography: 'body1', textAlign: 'left', marginLeft: '20px' }}>
            {"If you need an alternative for one of your exercises, tap on this image!"}
          </DialogContentText>
        </ListItem>

        <ListItem>
          <ListItemIcon>
            <DeleteIcon style={{ color: '#a30000' }} />
          </ListItemIcon>

          <DialogContentText sx={{ typography: 'body1', textAlign: 'left' }}>
            {":"}
          </DialogContentText>

          <DialogContentText sx={{ typography: 'body1', textAlign: 'left', marginLeft: '20px' }}>
            {"Here you can remove one exercise from your daily trainig list "}
          </DialogContentText>
        </ListItem>

        <ListItem>
          <DialogContentText sx={{ typography: 'body2', textAlign: 'left' }}>
            {"REMOVE ALL"}
          </DialogContentText>

          <DialogContentText sx={{ typography: 'body1', textAlign: 'left' }}>
            {":"}
          </DialogContentText>

          <DialogContentText sx={{ typography: 'body1', textAlign: 'left', marginLeft: '20px' }}>
            {"Tap here to remove all your exercises from your daily training list "}
          </DialogContentText>
        </ListItem>

        <ListItem>
          <DialogContentText sx={{ typography: 'body1', textAlign: 'left' }}>
            {"Click on the exercise name to view additional details and the execution video"}
          </DialogContentText>
        </ListItem>

      </List>

    </DialogContent>
  </Dialog>
);

export default function DailyTrainingAppBar(props) {
  const { title } = props;


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
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
              <GridItem xs={2} />
              <Grid xs={8} container alignItems="center">
                <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1, fontSize: '2rem' }}> {title} </Typography>
              </Grid>
              <Grid xs={2} container alignItems="center">
                <IconButton color="inherit" onClick={handleClickOpen}>
                  <InfoOutlinedIcon fontSize='large'/>
                </IconButton>

                <HelpDialog open={open} handleClose={handleClose} />

              </Grid>
            </Grid>
          </Box>
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
}
