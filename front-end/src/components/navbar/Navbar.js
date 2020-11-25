import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css'
import LogoBlue from '../../assets/logo/logo_light_background.png'
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

        if(this.state.loggedInUser){
            return(
                <nav className="nav-style">
                    <div className='nav-left'> 
      
                        <NavLink to='/profile' activeClassName='selected' className='nav-icon' ><img src={IconProfile} alt='icon profile' /></NavLink>
                        <NavLink to='/find-my-match' activeClassName='selected' className='nav-icon'><img src={IconRate} alt='icon profile' /></NavLink>
                        <NavLink to='/matches' activeClassName='selected' className='nav-icon'><img src={IconMatches} alt='icon profile' /></NavLink>

                        <div className='nav-big-screen'>
                            <Link to='/' className='logo-icon'><img  src={LogoBlue} alt='Logo readr'/></Link>
                            
                            <NavLink to='/find-my-match' activeClassName='selected'>Find my match</NavLink>
                            <NavLink to='/profile' activeClassName='selected'>Profile</NavLink>
                            <NavLink to='/matches' activeClassName='selected'>Matches</NavLink>
                        </div>
                       
                    </div>
                    <div className='nav-right'>
                    
                        <NavLink to='/' onClick={this.logoutUser}>Logout</NavLink>
                  
                    </div>
                </nav>
            )
        } else {
                return (
                    <nav className="nav-style">
                        <div className='nav-left'> 
                            <div className='nav-big-screen'>
                                <Link to='/' className='logo-icon'><img  src={LogoBlue} alt='Logo readr'/></Link>
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


