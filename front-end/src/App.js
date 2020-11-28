
import React from 'react'
import './App.css';
import { Switch, Route } from 'react-router-dom'
import ProtectedRoute from './services/auth/protected-route'
import AuthService from './services/auth/auth-services'

import Main from './components/pages/main/Main'
import NavBar from './components/elements/navbar/Navbar'
import Login from './components/pages/login/Login'
import Signup from './components/pages/signup/Signup'
import SwipeBookshelfs from './components/pages/swipebookshelfs/SwipeBookshelfs'
import ErrorPage from './components/pages/error-page/error-page'
import Profile from './components/pages/profile/Profile';
import Matches from './components/pages/matches/Matches';
import StartUpFlow from './components/pages/startupflow/StartUpFlow';



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
          {/* <ProtectedRoute userInSession={this.state.loggedInUser} path='/pick-my-books' componet={StartUpFlow} /> */}
          <Route exact path='/pick-my-books' render={(props) => <StartUpFlow {...props} userInSession={this.state.loggedInUser} />} />
        </Switch>
    
      </div>
    );
  }
  
}

export default App;
