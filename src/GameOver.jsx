import React, { useState, useEffect } from 'react';
import { Switch, Route, Link, useHistory } from 'react-router-dom';

export default function GameOver({ socket, setRound, winners, setWinners }) {
  const history = useHistory();
  const handleClick = e => {
    e.preventDefault();
    socket.emit('reset');
  };

  useEffect(() => {
    setRound(1);
    socket.emit('getWinners');
    socket.on('getWinners', memes => {
      setWinners(memes);
    });
    socket.on('reset', () => {
      history.push('/');
    });
  }, []);
  return (
    <div>
      {winners.length &&
        winners.map((meme, i) => (
          <div key={`round-${i}`}>
            <div>
              <p>Round: {i + 1} </p>
              <p>Creator: {meme.name} </p>
              <p>Points: {meme.likes}</p>
              <button>
                <Link to={meme.memeUrl} target="_blank" download>
                  Click to Download
                </Link>
              </button>
            </div>
            <img src={meme.memeUrl} />
          </div>
        ))}
      <button onClick={handleClick}>Restart Meme Hours</button>
    </div>
  );
}
