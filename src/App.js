import React from 'react';
import StageOne from './StageOne';
import Home from './Home';
import { Switch, Route } from 'react-router-dom';

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
      </Switch>
    </div>
  );
}
