import React, { useState, useEffect } from 'react';
import { Switch, Route, Link, useHistory } from 'react-router-dom';

export default function GameOver({ socket, setRound, winners, setWinners, self }) {
  const history = useHistory();
  const handleClick = e => {
    e.preventDefault();
    socket.emit('reset');
  };

  useEffect(() => {
    socket.emit('getWinners');
    socket.on('getWinners', memes => {
      setWinners(memes);
    });
    socket.on('reset', () => {
      setRound(1);
      history.push('/');
    });
  }, []);
  return (
    <div>
      {winners.length &&
        winners.map((meme, i) => (
          <div key={`round-${i}`}>
            <div>
              <p>Round: {meme.round} </p>
              <p>Creator: {meme.name} </p>
              <p>Points: {meme.likes}</p>
            </div>
            <img src={meme.memeUrl} />
          </div>
        ))}
      {self.isHost && <button onClick={handleClick}>Restart Meme Hours</button>}
    </div>
  );
}
