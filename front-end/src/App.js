
import React from 'react'
import './App.css';
import { Switch, Route } from 'react-router-dom'
import Main from './components/main/Main'
import NavBar from './components/navbar/Navbar'
import AuthService from './services/auth/auth-services'
import Login from './components/login/Login'
import Signup from './components/signup/Signup'
import SwipeBookshelfs from './components/swipebookshelfs/SwipeBookshelfs'
import ErrorPage from './components/error-page/error-page'
import Profile from './components/profile/Profile';



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
          <Route exact path='/find-my-match' render={() => <SwipeBookshelfs />}/>
          <Route exact path='/404' component={ErrorPage} />
          <Route exact path='/profile' render={() => <Profile getTheUser={this.getTheUser} userInSession={this.state.loggedInUser} /> } />

        </Switch>
    
      </div>
    );
  }
  
}

export default App;
