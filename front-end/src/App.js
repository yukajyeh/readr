
import React from 'react'
import './App.css';
import { Switch, Route } from 'react-router-dom'
import Main from '../src/components/main/Main'
import NavBar from '../src/components/navbar/Navbar'
import Signup from '../src/components/signup/Signup'
import AuthService from '../src/services/auth/auth-services'


class App extends React.Component {

  state= {
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
  
        <NavBar getTheUser={this.getTheUser} />
        
        <Switch>
          <Route exact path='/' component={Main} />
          <Route exact path='/signup' render={() => <Signup getTheUser={this.getTheUser} /> } />
        </Switch>
    
      </div>
    );
  }
  
}

export default App;
