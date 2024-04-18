import React from 'react';
import { Dialog, DialogContent, DialogTitle, Typography } from '@mui/material';

const PopupHP = ({ open, handleClose, title, content }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle style={{ textAlign: 'center' }}>
        <Typography fontWeight="bold" fontSize={25}>
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        {content}
        <Typography fontWeight="bold" style={{ textAlign: 'center' }}>
          Tap on one exercise for further details
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default PopupHP;

