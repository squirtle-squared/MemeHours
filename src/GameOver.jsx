import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function GameOver({ socket }) {
  const history = useHistory();

  useEffect(() => {
    socket.on('reset', () => {
      history.push('/');
    });
  }, []);

  return <div></div>;
}
