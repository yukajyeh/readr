import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom';
import * as Scroll from 'react-scroll';
import './Navbar.css'

import LogoBlue from '../../../assets/logo/logo_light_background.png'
import IconMatches from '../../../assets/icons/book_heart_orange.png'
import IconRate from '../../../assets/icons/swipe_orange.png'
import IconProfile from '../../../assets/icons/profile_orangecolor.png'
import IconLogout from '../../../assets/icons/logout-og.png'
import DefaultAvatar from '../../../assets/default_avatar.jpg'
import AuthService from '../../../services/auth/auth-services';

let ScrollLink = Scroll.Link

export default class Navbar extends Component {

    state = {
        loggedInUser: null,
        widthNav: '0',
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

    openNav = () => {
        this.setState({
            widthNav: '100%'
        })
    }

    closeNav = () => {
        this.setState({
            widthNav: '0px'
        })
    }

    logoutUser = () => {
        this.service.logout()
        .then(() => {
            this.props.getTheUser(null)     
        })
        .catch(err => console.log(err))
    }


    render() {
        const userInSession = this.state.loggedInUser

        if(userInSession){
            return(
                <nav className="nav-style">
                    <div className='nav-left'> 
      


                        <div className='logo-readr'>
                            <Link to='/'><img  src={LogoBlue} alt='Logo readr'/></Link>
                        </div>

                        <div className='nav-mobile'>
                            <p className="openbtn" onClick={this.openNav}>&#9776;</p>

                            <div className="sidenav" style={{width: this.state.widthNav}}>
                                    <p className="closebtn" onClick={this.closeNav}>&times;</p>
                                    <NavLink to='/find-my-match' activeClassName='selected'><img src={IconRate} alt='icon find my match' style={{height:'12px'}} />  Find my match</NavLink>
                                    <NavLink to='/matches' activeClassName='selected'><img src={IconMatches} alt='icon matches' style={{height:'12px'}} />  Matches</NavLink>
                                    <NavLink to='/profile' activeClassName='selected'><img src={IconProfile} alt='icon profile' style={{height:'12px'}} />  Profile</NavLink>
                                    <hr/>
                                    <button onClick={this.logoutUser} activeClassName='selected'> <img src={IconLogout} alt='icon profile' style={{height:'12px'}}/>   Logout</button>
                            
                            </div>
                        </div>
                       
                       
                    </div>
                    <div className='nav-right'>
                        <NavLink to='/find-my-match' activeClassName='selected'><img src={IconRate} alt='icon matches' style={{height:'12px'}} />  Find my match</NavLink>
                        <NavLink to='/matches' activeClassName='selected'><img src={IconMatches} alt='icon matches' style={{height:'12px'}} />  Matches</NavLink>
                      
                        <div className="dropdown">
                            <img className='profile-img' src={!userInSession.profileImage ? DefaultAvatar : userInSession.profileImage} alt='user'/>
                            <div className="dropdown-content">
                                <NavLink to='/profile' activeClassName='selected'><img src={IconProfile} alt='icon profile' style={{height:'12px'}} />  Profile</NavLink>
                                <button onClick={this.logoutUser} activeClassName='selected'> <img src={IconLogout} alt='icon profile' style={{height:'12px'}}/> Logout</button>
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


