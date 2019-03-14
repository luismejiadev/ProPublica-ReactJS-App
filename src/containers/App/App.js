import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import './App.css';
import bg from '../../assets/images/bg.png';

import asyncComponent from '../../hoc/asyncComponent';
import NotFound from '../../components/NotFound/NotFound';
import NavBar from '../NavBar/NavBar';

const CongressPeople = asyncComponent(() => import('../CongressPeople/CongressPeople'));
const CongressPersonDetail = asyncComponent(() => import('../CongressPersonDetail/CongressPersonDetail'));

class App extends Component {
  state = {
    searchText: ''
  }

  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <img alt="BackGround" className="BackGround" src={bg} />
        <NavBar />
        <section className="container">
          <Switch>
            <Route path="/congresspeople" exact component={CongressPeople} />
            <Route path="/congressperson/:id" component={CongressPersonDetail} />
            <Route path="/" exact render={()=>(
              <div className="Splash">
                <h1>Welcome Congress People App</h1>
                <p><a href="https://www.linkedin.com/in/luiscarlosmejia/" target="_blank">By: Luis Carlos Mejia</a></p>
                <Link to="/congresspeople" className="btn btn-primary btn-primary">Log In</Link>
              </div>)} />
            <Route component={NotFound} />
          </Switch>
        </section>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
