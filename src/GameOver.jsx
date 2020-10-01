import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default function GameOver({ socket, setRound }) {
  const history = useHistory();
  const [winners, setWinners] = useState([]);
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
      setWinners([]);
      socket.emit('deleteWinners');
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
            </div>
            <img src={meme.memeUrl} />
          </div>
        ))}
      <button onClick={handleClick}>Restart Meme Hours</button>
    </div>
  );
}
