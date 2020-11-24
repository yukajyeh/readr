import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css'
import LogoNavBarOrange from '../../assets/Logo_dark_background.png'
import LogoNavBarDark from '../../assets/logo_light_background.png'
import AuthService from '../../services/auth/auth-services';


export default class Navbar extends Component {

    state = {
        loggedInUser: null
    }

    service = new AuthService()

    componentWillReceiveProps(nextProps) {
        this.setState({...this.state, loggedInUser: nextProps["userInSession"]})
      }

    logoutUser = () => {
        this.service.logout()
        .then(() => {
            this.setState({loggedInUser: null})
            this.props.getTheUser(null)
        })
        .catch(err => console.log(err))
    }


    render() {
   
        if(this.state.loggedInUser){
            return(
                <nav className="nav-style">
                    <div> <Link to='/'><img src={LogoNavBarOrange} alt='Logo readr'/></Link></div>
                    <div>
                        <ul>
                            <li> <NavLink to='/find-my-match' activeClassName='selected'>Find my match</NavLink></li>
                            <li> <NavLink to='/profile' activeClassName='selected'>Profile</NavLink></li>
                            <li> <NavLink to='/matches' activeClassName='selected'>Matches</NavLink></li>
                        </ul>
                    </div>
                    <div>
                        <ul>
                            <li><NavLink to='/' onClick={this.logoutUser}>Logout</NavLink></li>
                        </ul>
                    </div>
                </nav>
            )
        } else {
            if(window.location.href.includes('about') || window.location.href.includes('404')) {
                return (
                    <nav className="nav-style">
                        <div> <Link to='/'><img src={LogoNavBarOrange} alt='Logo readr'/></Link></div>
                        <div>
                            <ul>
                                <li><NavLink to='/login' activeClassName='selected' >Log in</NavLink></li>
                                <li><NavLink to='/signup' activeClassName='selected'>Sign up</NavLink></li>
                            </ul>
                        </div>
                    </nav>
                )
            }  else {
                return (
                    <nav className="nav-style">
                        <div> </div>
                        <div>
                            <ul>
                                <li><NavLink to='/login' activeClassName='selected'>Log in</NavLink></li>
                                <li><NavLink to='/about' activeClassName='selected'>About</NavLink></li>
                            </ul>
                        </div>
                    </nav>
                )
            }

        }
    }
}


