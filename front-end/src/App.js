
import React from 'react'
import './App.css';
import { Switch, Route } from 'react-router-dom'
import ProtectedRoute from './services/auth/protected-route'
import AuthService from './services/auth/auth-services'

import Main from './components/main/Main'
import NavBar from './components/navbar/Navbar'
import Login from './components/login/Login'
import Signup from './components/signup/Signup'
import SwipeBookshelfs from './components/swipebookshelfs/SwipeBookshelfs'
import ErrorPage from './components/error-page/error-page'
import Profile from './components/profile/Profile';
import Matches from './components/matches/Matches';



class App extends React.Component {

  state = {
    loggedInUser: null
  }

  service = new AuthService()

  componentDidMount(){
    this.service.loggedin()
    .then((user) => {
      this.setState({
        loggedInUser: user,
      })
    })
    .catch((err)=> {
      console.log(err)
    })
  }

  getTheUser = (user) => {
    this.setState({
      loggedInUser: user
    })
  }


  render(){
    return (
      <div className="App">
  
        <NavBar userInSession={this.state.loggedInUser}/>
        
        <Switch>
          <Route exact path='/' component={Main} />
          <Route exact path='/login' render={() => <Login getTheUser={this.getTheUser} />}/>
          <Route exact path='/signup' render={() => <Signup getTheUser={this.getTheUser} /> } />
          <Route exact path='/404' component={ErrorPage} />

          <ProtectedRoute userInSession={this.state.loggedInUser} path='/find-my-match' component={SwipeBookshelfs} />
          <ProtectedRoute userInSession={this.state.loggedInUser} path='/profile' component={Profile} getTheUser={this.getTheUser} />
          <ProtectedRoute userInSession={this.state.loggedInUser} path='/matches' componet={Matches} />
        </Switch>
    
      </div>
    );
  }
  
}

export default App;
