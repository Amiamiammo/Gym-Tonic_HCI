import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';

export default function MyAppBar(props) {

    const {title} = props;

  return (
    <Box sx={{ width: '100%' }}>
    <MuiAppBar>
          <Toolbar sx={{minHeight : 100, height: 100}}>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1, fontSize: '2rem' }}
            >
              {title}
            </Typography>
          </Toolbar>
    </MuiAppBar>
    </Box>
  );
}

