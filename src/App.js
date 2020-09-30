import React from 'react';
import { Switch, Route } from 'react-router-dom';
import StageOne from './StageOne';
import Home from './Home';
import WaitingRoom from './WaitingRoom';
import io from 'socket.io-client';

export default function App() {
  const socket = io.connect('http://localhost:3001');
  socket.on('messageFromServer', msg => {
    console.log(msg);

    socket.emit('messageFromClient', 'happy to be here!');
  });

  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/main">
          <StageOne />
        </Route>
      </Switch>
    </div>
  );
}
