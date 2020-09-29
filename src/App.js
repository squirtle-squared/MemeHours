import React from 'react';
import StageOne from './StageOne';
import Home from './Home';
import { Switch, Route } from 'react-router-dom';
import WaitingRoom from './WaitingRoom';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/main">
          <StageOne />
        </Route>
        <Route path="/waiting">
          <WaitingRoom />
        </Route>
      </Switch>
    </div>
  );
}
