import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Candidates from './Candidates';

export default function Voting({ socket }) {
  const [candidates, setCandidates] = useState([]);
  const history = useHistory();
  let memes;

  //another timer to track voting - 1 min
  //same conditional rendering as ideation

  socket.emit('getCandidates');

  useEffect(() => {
    socket.on('memeCandidates', memes => {
      setCandidates(memes);
    });
    socket.on('winner', () => {
      history.push('/winner');
    });
  }, []);

  return <div>{candidates.length && candidates.map(meme => <img src={meme.memeUrl} />)}</div>;
}
