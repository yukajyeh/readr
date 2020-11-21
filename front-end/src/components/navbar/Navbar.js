import React, { Component } from 'react'
import { Link } from 'react-router-dom';


export default class Navbar extends Component {

  

    // componentWillReceiveProps(nextProps) {
    //     this.setState({...this.state, loggedInUser: nextProps["userInSession"]})
    // }

    render() {
        console.log(window.location.href)
        if(){
            return(
            <nav className="nav-style">
                <img src='' alt=''></img>
                <Link to='/profile' style={{ textDecoration: 'none' }}>Profile</Link>
                <Link to='/matches' style={{ textDecoration: 'none' }}>Matches</Link>
            </nav>
            )
        } else {
            return (
                <nav className="nav-style">
                    <img src='' alt=''></img>
                    <Link to='/login' style={{ textDecoration: 'none' }}>Login</Link>
                </nav>
            )

        }
    }
}


