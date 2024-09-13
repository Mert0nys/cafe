import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NaviBar from './Components/Navibar';
import Footer from './Components/Footer';
import { BrowserRouter as Router, Route, Switch, } from 'react-router-dom';

import {Home} from './Nav-Bar/Home';
import {Menu} from './Nav-Bar/Menu';
import {About} from './Nav-Bar/About';
import Login from './Components/Login';
import Logout from './Components/Logout';
import Register from './Components/Register';
import LoadingComponent from './Components/LoadingComponent';



function App() {
  return (
    <>
    <Router>
    <NaviBar/>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/menu" component={Menu} />
      <Route path="/about" component={About} />
      <Route path="/login" component={Login} />
      <Route path="/logout" component={Logout} />
      <Route path="/register" component={Register} />
      <Route path="/loading" component={LoadingComponent} />
    </Switch>
    </Router>
    
    </>
  )
}

export default App;
