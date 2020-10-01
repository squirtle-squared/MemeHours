import React from 'react';
import Home from './Home';
import io from 'socket.io-client';

export default function App() {
  const socket = io.connect('http://localhost:3001');

  return (
    <div>
      <Home socket={socket} />
    </div>
  );
}
