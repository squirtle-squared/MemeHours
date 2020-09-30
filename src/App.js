import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Ideation from './Ideation';
import Home from './Home';
import WaitingRoom from './WaitingRoom';
import io from 'socket.io-client';

export default function App() {
  const socket = io.connect('http://localhost:3001');

  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Home socket={socket} />
        </Route>
        <Route path="/ideation">
          <Ideation socket={socket} />
        </Route>
      </Switch>
    </div>
  );
}
