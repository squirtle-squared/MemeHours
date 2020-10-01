import React, { useState, useEffect, useRef } from 'react';

export default function Timer({ mins, secs }) {
  const [minutes, setMinutes] = useState(mins);
  const [seconds, setSeconds] = useState(secs);

  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds => seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
          alert("Time's Up!");
        } else {
          setMinutes(minutes => minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <div className="timer">
      {minutes === 0 && seconds == 0 ? null : (
        <h2>
          Time Remaining: {minutes}: {seconds < 10 ? `0${seconds}` : seconds}
        </h2>
      )}
    </div>
  );
}
