import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css'
import LogoBlue from '../../../assets/logo/logo_light_background.png'
import IconMatches from '../../../assets/icons/book_heart_orange.png'
import IconRate from '../../../assets/icons/swipe_orange.png'
import DefaultAvatar from '../../../assets/default_avatar.jpg'
import AuthService from '../../../services/auth/auth-services';


export default class Navbar extends Component {

    state = {
        loggedInUser: null
    }

    service = new AuthService()

    componentWillReceiveProps(nextProps) {
        this.setState({...this.state, loggedInUser: nextProps["userInSession"]})
      }


    render() {

        console.log(this.state.loggedInUser)

        const userInSession = this.state.loggedInUser

        if(userInSession){
            return(
                <nav className="nav-style">
                    <div className='nav-left'> 
      
                        <NavLink to='/find-my-match' activeClassName='selected' className='nav-icon'><img src={IconRate} alt='icon profile' /></NavLink>
                        <NavLink to='/matches' activeClassName='selected' className='nav-icon'><img src={IconMatches} alt='icon profile' /></NavLink>
                        <Link to='/profile' >
                            <img className='profile-img nav-icon' src={userInSession.profileImage === '/images/default_avatar.jpg' ? DefaultAvatar : userInSession.profileImage} alt='user'/>
                        </Link>

                        <div className='nav-big-screen'>
                            <Link to='/'><img  src={LogoBlue} alt='Logo readr'/></Link>
                        </div>
                       
                    </div>
                    <div className='nav-right'>
                        <NavLink to='/find-my-match' activeClassName='selected'>Find my match</NavLink>
                        <NavLink to='/matches' activeClassName='selected'>Matches</NavLink>
                        <Link to='/profile' >
                            <img className='profile-img' src={userInSession.profileImage === '/images/default_avatar.jpg' ? DefaultAvatar : userInSession.profileImage} alt='user'/>
                        </Link>
                
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
                            <NavLink to='/signup' activeClassName='selected'>Sign up</NavLink>
                            <NavLink to='/about' activeClassName='selected' >About</NavLink>
                        </div>
                    </nav>
                )
                
            

        }
    }
}


