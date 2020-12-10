
import React from 'react'
import './App.css';
import { Switch, Route } from 'react-router-dom'
import ProtectedRoute from './services/auth/protected-route'
import AuthService from './services/auth/auth-services'

import Main from './components/pages/main/Main'
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

  fetchUser(){
    if(this.state.loggedInUser === null ){
      this.service.loggedin()
      .then(response =>{
        this.setState({
          loggedInUser:  response
        }) 
      })
      .catch( err =>{
        this.setState({
          loggedInUser:  false
        }) 
      })
    }
  }

  getTheUser = (user) => {
    this.setState({
      loggedInUser: user
    })
  }


  render(){
    this.fetchUser()
    return (
      <div>

                
        <Switch>
          <Route exact path='/' render={(props) => <Main {...props} userInSession={this.state.loggedInUser} />} />
          <Route exact path='/404' component={ErrorPage} />

          <Route exact path='/login' render={() => <Login getTheUser={this.getTheUser} />}/>
          <Route exact path='/signup' render={() => <Signup getTheUser={this.getTheUser} /> } />
           {/* <ProtectedRoute userInSession={this.state.loggedInUser} path='/pick-my-books' componet={StartUpFlow} /> */}
          <Route exact path='/pick-my-books' render={(props) => <StartUpFlow {...props} userInSession={this.state.loggedInUser} />} />

          <ProtectedRoute userInSession={this.state.loggedInUser} path='/find-my-match' component={SwipeBookshelfs} />
          <ProtectedRoute userInSession={this.state.loggedInUser} path='/profile' component={Profile} getTheUser={this.getTheUser} />
          <ProtectedRoute userInSession={this.state.loggedInUser} path='/matches' component={Matches} />
         
        </Switch>
    
      </div>
    );
  }
  
}

export default App;
