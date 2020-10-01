import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Candidates from './Candidates';
import Timer from './Timer.jsx';

export default function Voting({ socket, self }) {
  const [candidates, setCandidates] = useState([]);
  const history = useHistory();
  const [likes, setLikes] = useState([]);
  const [timesUp, setTimesUp] = useState(false);
  const handleClick = (e, i) => {
    e.preventDefault();
    const newCandidates = [...candidates];
    if (likes[i] < 10 || !likes[i]) {
      newCandidates[i].likes += 1;
      if (!likes[i]) {
        const newLikes = [...likes];
        newLikes[i] = 1;
        setLikes(newLikes);
      } else {
        const newLikes = [...likes];
        newLikes[i]++;
        setLikes(newLikes);
      }
      socket.emit('updateCandidates', newCandidates);
    }
  };
  const handleDislike = (e, i) => {
    e.preventDefault();
    const dislikedCandidates = [...candidates];
    if (likes[i] > 0) {
      dislikedCandidates[i].likes -= 1;
      const updatedLikes = [...likes];
      updatedLikes[i]--;
      setLikes(updatedLikes);
    }
    socket.emit('updateCandidates', dislikedCandidates);
  };

  let memes;

  //another timer to track voting - 1 min
  //same conditional rendering as ideation
  useEffect(() => {
    socket.emit('getCandidates');
    socket.on('memeCandidates', memes => {
      setCandidates(memes);
    });
    socket.on('updateCandidates', memes => {
      setCandidates(memes);
    });
  }, []);

  useEffect(() => {
    if (timesUp) history.push('/winner');
  }, [timesUp]);

  return (
    <div>
      <Timer mins={0} secs={10} setTimesUp={setTimesUp} />
      {candidates.length &&
        candidates.map((meme, i) => (
          <div key={`candidate-${i}`}>
            <p>Meme {i + 1}</p>
            {self.id !== meme.id && (
              <div>
                <button onClick={e => handleClick(e, i)}>Like</button>
                {likes[i] > 0 && <button onClick={e => handleDislike(e, i)}>Unlike</button>}
                {likes[i] > 0 && <span>You have liked this meme {likes[i]} times</span>}
              </div>
            )}
            {self.id === meme.id && <p>Your meme</p>}
            <div>
              <img src={meme.memeUrl} />
            </div>
          </div>
        ))}
      {!candidates.length && (
        <div>
          <h1>Nobody submitted a meme!</h1>
          <img src="https://i.imgflip.com/4gyhog.jpg" />
        </div>
      )}
    </div>
  );
}
