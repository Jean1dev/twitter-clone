import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './pages/login'
import Timeline from './pages/Timeline'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login}></Route>
          <Route path="/timeline" component={Timeline}></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
