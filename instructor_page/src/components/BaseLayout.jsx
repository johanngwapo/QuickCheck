import React from 'react';
import { Container, Box } from '@mui/material';
import AvatarList from './AvatarList';

const BaseLayout = ({ children }) => {
  return (
    <>
      {/* Top Navigation */}
      <AvatarList />

      {/* Centered Content */}
      <Box component="main" className="main-content">
        <Container maxWidth="xl">
          {children}
        </Container>
      </Box>
    </>
  );
};

export default BaseLayout;
