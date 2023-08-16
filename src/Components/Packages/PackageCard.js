import React from 'react';
import { Card, CardContent, Typography, makeStyles } from '@material-ui/core';

const PackagesCard = () => {
  return (
    <Card className='packages-card'>
      <CardContent className='packages-card-content'>
        <Typography className='package-heading' variant="h5">Silver Package</Typography>
        <Typography className='packages-description' variant="body1">Package Description</Typography>
        <Typography className='packages-price' variant="body2">Package Price</Typography>
      </CardContent>
    </Card>
  );
};

export default PackagesCard;