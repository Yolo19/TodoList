import React, { FC } from 'react';
import { Button } from 'antd';
import logo from './logo.svg';
import './App.css';
import HomePage from './pages/Home/Home';
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import LoginForm from './pages/Login/LoginForm';


const history = createBrowserHistory();
const App: FC = () => (
  
  <Router history={history}>
    <Switch>
      <Route  exact path={"/login"} component={LoginForm}/>
      <Route  path={"/"} component={HomePage}/>
    </Switch>
  </Router>
  
);

export default App;
