// Icons.jsx
import React from 'react';
import Box from '@mui/material/Box';

const Icons = ({ children, size = 24, color = '#333', sx = {} }) => {
  const styledIcon = React.cloneElement(children, {
    style: { fontSize: size, color },
  });

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...sx,
      }}
    >
      {styledIcon}
    </Box>
  );
};

export default Icons;
