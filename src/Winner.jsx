import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function Winner({ socket }) {
  const history = useHistory();

  useEffect(() => {
    socket.on('gameOver', () => {
      history.push('/gameOver');
    });
    socket.on('newRound', () => {
      history.push('/ideation');
    });
  }, []);

  return (
    <div>

    </div>
  )

}