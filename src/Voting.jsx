import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function Voting({ socket }) {
  const history = useHistory();

  useEffect(() => {
    socket.on('winner', () => {
      history.push('/winner');
    });
  }, []);

  return <div>hello world! let's vote</div>;
}
