import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory } from 'react-router-dom';
import Timer from './Timer.jsx';

export default function Winner({
  socket,
  setSubmitClicked,
  setIdeationTimesUp,
  setAllSubmitted,
  round,
  setRound,
}) {
  const history = useHistory();
  const [timesUp, setTimesUp] = useState(false);
  const [winner, setWinner] = useState({});

  useEffect(() => {
    socket.emit('getCandidates');
    socket.on('memeCandidates', candidates => {
      let max = -Infinity;
      let winningMeme;
      for (let candidate of candidates) {
        if (candidate.likes > max) {
          max = candidate.likes;
          winningMeme = candidate;
        }
      }
      setWinner(winningMeme);
    });
  }, []);

  useEffect(() => {
    if (timesUp) {
      socket.emit('newRound', round + 1);
      if (round + 1 === 4) {
        socket.emit('gameOver');
      } else {
        socket.emit('ideate');
      }
    }
    // socket.emit('newRound', round + 1);
  }, [timesUp]);

  useEffect(() => {
    socket.emit('roundWinner', winner);
  }, [winner]);

  useEffect(() => {
    socket.on('newRound', round => {
      setSubmitClicked(false);
      setIdeationTimesUp(false);
      setAllSubmitted(false);
      setRound(round);
    });
    socket.on('ideate', () => {
      history.push('/ideation');
    });
    socket.on('gameOver', () => {
      history.push('/gameOver');
    });
  }, []);

  return (
    <div>
      <Timer mins={0} secs={2} setTimesUp={setTimesUp} />
      <h1>The Winning Meme of Round {round}</h1>
      {winner && (
        <div>
          <h3>Creator: {winner.name}</h3>
          <h3>Points: {winner.likes}</h3>
          <img src={winner.memeUrl} />
        </div>
      )}
    </div>
  );
}
