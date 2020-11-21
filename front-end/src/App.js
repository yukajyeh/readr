
import React from 'react'
import './App.css';
import { Switch, Route } from 'react-router-dom'
import Main from './components/main/Main'
import NavBar from './components/navbar/Navbar'
import AuthService from './services/auth/auth-services'
import Login from './components/login/Login';

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
          <Route exact path='/login' render={() => <Login getTheUser={this.getTheUser} />}/>
          <Route exact path='/signup' render={() => <Signup getTheUser={this.getTheUser} /> } />

        </Switch>
    
      </div>
    );
  }
  
}

export default App;
