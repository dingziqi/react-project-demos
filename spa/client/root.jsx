import React from 'react';
import { hot } from 'react-hot-loader';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/home';
import Index from './pages/index';

class Root extends React.PureComponent {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Index} />
          <Route exact path="/home" component={Home} />
        </Switch>
      </Router>
    );
  }
}

export default hot(module)(Root);
