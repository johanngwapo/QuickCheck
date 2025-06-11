import React from 'react';
import { Avatar } from '@mui/material';
import { green } from '@mui/material/colors'; 

function Kyuare() {
  return (
    <Avatar
      src="qr_pic.png"
      sx={{ bgcolor: green[500], width: 200, height: 200 }}
      variant="rounded"
    />
  );
}

export default Kyuare;
