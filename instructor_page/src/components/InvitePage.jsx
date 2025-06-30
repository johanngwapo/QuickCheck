import React from 'react';
import { useParams } from 'react-router-dom';

const InvitePage = () => {
  const { code } = useParams();

  return (
    <div>
      <h2>Welcome!</h2>
      <p>You were invited with code: <strong>{code}</strong></p>
    </div>
  );
};

export default InvitePage;
