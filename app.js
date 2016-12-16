import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Home from './components/Home';
import AuthCB from './components/AuthCB';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

const App = () => {
  return (
    <Router history={browserHistory}>
      <Route path="/" component={Home} />
      <Route path="/authorize_callback" component={AuthCB} />
    </Router>
  );
};

ReactDom.render(<App />, document.getElementById('app'));

export default history;