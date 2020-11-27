import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import './Profile.css'
import AuthService from '../../services/auth/auth-services';


export default class Profile extends Component {

    state = {
        loggedInUser: null,
        redirect: false
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
        .then(() => {
            this.setState({redirect: true})
        })
        .catch(err => console.log(err))
    }


    render() {

        if(this.state.redirect){
            return <Redirect to='/'></Redirect>
        }

        return (
            <div className='profile-page'>
                <div className='outercontainer'>
                    <button onClick={this.logoutUser}>Logout</button>
                </div>
        
                
            </div>
        )
    }
}
