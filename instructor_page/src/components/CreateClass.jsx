// CreateClass.jsx
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const CreateClass = ({ onClick }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        width: 250,
        height: 140,
        border: '2px dashed #ccc',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        backgroundColor: '#fafafa',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          borderColor: '#1976d2',
          color: '#1976d2',
          backgroundColor: '#f0f8ff',
        },
      }}
    >
      <Typography variant="h6" fontWeight={500}>
        + Create Class
      </Typography>
    </Box>
  );
};

export default CreateClass;
