import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom';
import * as Scroll from 'react-scroll';
import './Navbar.css'

import LogoBlue from '../../../assets/logo/logo_light_background.png'
import IconMatches from '../../../assets/icons/book_heart_orange.png'
import IconRate from '../../../assets/icons/swipe_orange.png'
import DefaultAvatar from '../../../assets/default_avatar.jpg'
import AuthService from '../../../services/auth/auth-services';

let ScrollLink = Scroll.Link

export default class Navbar extends Component {

    state = {
        loggedInUser: null,
        dropDownOpen: false
    }

    service = new AuthService()

    componentDidMount(){
        this.setState({
            loggedInUser: this.props.userInSession
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({...this.state, loggedInUser: nextProps["userInSession"]})
    }


    render() {
        const userInSession = this.state.loggedInUser

        if(userInSession){
            return(
                <nav className="nav-style">
                    <div className='nav-left'> 
      
                        <NavLink to='/find-my-match' activeClassName='selected' className='nav-icon'><img src={IconRate} alt='icon profile' /></NavLink>
                        <NavLink to='/matches' activeClassName='selected' className='nav-icon'><img src={IconMatches} alt='icon profile' /></NavLink>
                        <Link to='/profile' >
                            <img className='profile-img nav-icon' src={!userInSession.profileImage ? DefaultAvatar : userInSession.profileImage} alt='user'/>
                        </Link>

                        <div className='nav-big-screen'>
                            <Link to='/'><img  src={LogoBlue} alt='Logo readr'/></Link>
                        </div>
                       
                    </div>
                    <div className='nav-right'>
                        <NavLink to='/find-my-match' activeClassName='selected'>Find my match</NavLink>
                        <NavLink to='/matches' activeClassName='selected'>Matches</NavLink>
                        {/* <Link to='/profile' >
                            <img className='profile-img' src={!userInSession.profileImage ? DefaultAvatar : userInSession.profileImage} alt='user'/>
                        </Link> */}
                      
                        <div class="dropdown">
                            <img className='profile-img' src={!userInSession.profileImage ? DefaultAvatar : userInSession.profileImage} alt='user'/>
                            <div className="dropdown-content">
                                <NavLink to='/profile' activeClassName='selected'>Profile</NavLink>
                                <NavLink to='#' activeClassName='selected'>Logout</NavLink>
                            </div>
                        </div>
                
                    </div>
                </nav>
            )
        } else {
                return (
                    <nav className="nav-style">
                        <div className='nav-left'> 
                            <div className='nav-big-screen-no-user'>
                                <Link to='/'><img  src={LogoBlue} alt='Logo readr'/></Link>
                            </div>
                        </div>    
                        <div className='nav-right-no-user'>
                            <NavLink to='/login' activeClassName='selected' >Log in</NavLink>
                            <ScrollLink 
                                className='about-link'
                                to='about-section'
                                spy={true}
                                smooth={true}
                                offset={-70}
                                duration= {500}
                            >About</ScrollLink>
                        </div>
                    </nav>
                )
                
            

        }
    }
}


