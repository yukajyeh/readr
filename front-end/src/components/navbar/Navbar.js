import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import './Navbar.css'
import LogoNavBarOrange from '../../assets/Logo_dark_background.png'
import LogoNavBarDark from '../../assets/logo_light_background.png'


export default class Navbar extends Component {

  

    // componentWillReceiveProps(nextProps) {
    //     this.setState({...this.state, loggedInUser: nextProps["userInSession"]})
    // }

    render() {
        console.log(window.location.href)
        if(this.props.loggedInUser){
            return(
            <nav className="nav-style">
                <div> <img src='' alt=''></img></div>
                <div>
                    <Link to='/profile' >Profile</Link>
                    <Link to='/matches' >Matches</Link>
                </div>
            </nav>
            )
        } else {
            return (
                <nav className="nav-style">
                    <div></div>
                    <div>
                        <ul>
                            <li><Link to='/login' >Login</Link></li>
                            <li><Link to='/about' >About</Link></li>
                        </ul>
                    </div>
                </nav>
            )
        }
    }
}


