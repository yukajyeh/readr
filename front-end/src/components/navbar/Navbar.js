import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css'
import LogoIconLight from '../../assets/logo/icon_orange.png'
import IconProfile from '../../assets/icons/profile_orangecolor.png'
import IconMatches from '../../assets/icons/book_heart_orange.png'
import IconRate from '../../assets/icons/swipe_orange.png'
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
   
        if(!this.state.loggedInUser){
            return(
                <nav className="nav-style">
                    <div className='nav-left'> 
                        <Link to='/' ><img className='logo-icon' src={LogoIconLight} alt='Logo readr'/></Link>
                        <ul>
                            <li className='nav-icon'> <NavLink to='/find-my-match' activeClassName='selected'><img src={IconRate} alt='icon profile' /></NavLink></li>
                            <li className='nav-icon'> <NavLink to='/find-my-match' activeClassName='selected' ><img src={IconProfile} alt='icon profile' /></NavLink></li>
                            <li className='nav-icon'> <NavLink to='/find-my-match' activeClassName='selected' ><img src={IconMatches} alt='icon profile' /></NavLink></li>

                            <li> <NavLink to='/find-my-match' activeClassName='selected' className='nav-text-link'>Find my match</NavLink></li>
                            <li> <NavLink to='/profile' activeClassName='selected' className='nav-text-link'>Profile</NavLink></li>
                            <li> <NavLink to='/matches' activeClassName='selected' className='nav-text-link'>Matches</NavLink></li>
  
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
                        <div> <Link to='/'><img className='logo-icon' src={LogoIconLight} alt='Logo readr'/></Link></div>
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


