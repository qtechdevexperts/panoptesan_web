import React from 'react';
import { styled, TextField } from '@mui/material';

export const CustomTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '50px', // Make the border round
    backgroundColor: '#ffffff', // Set the inner area color to white
  },
}));