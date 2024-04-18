import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import HomeIcon from '@mui/icons-material/Home';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';

export default function FixedBottomNavigation() {
  const [value, setValue] = React.useState(0);

  return (

    <Box sx={{ pb: 7 }} >
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, marginTop: '5px'}} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Home" icon={< HomeIcon />} component={Link} to="/"/>
          <BottomNavigationAction label="Exercises" icon={<FitnessCenterIcon />} component={Link} to="/exercises" />
          <BottomNavigationAction label="DailyTraining" icon={<CheckBoxOutlinedIcon />} component={Link} to="/dailytraining"/>
          <BottomNavigationAction label="Quiz" icon={<HelpOutlineOutlinedIcon />} component={Link} to="/quiz"/>
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
