import React from 'react';
import { Avatar } from '@mui/material';

function Logo() {
  return (
    <Avatar
      alt="My Logo"
      src="/quickcheck_logo.png"
      sx={{ width: 100, height: 100 }}
    />
  );
}

export default Logo;