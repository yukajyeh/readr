import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import './Profile.css'

import Button from '../../elements/button/Button';
import DefaultAvatar from '../../../assets/default_avatar.jpg'
import BookshelfDisplay from '../../elements/bookshelf/Bookshelf'

import AuthService from '../../../services/auth/auth-services';
import Navbar from '../../elements/navbar/Navbar';


export default class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loggedInUser: null,
            redirect: false
        }
    }

    service = new AuthService()


    componentWillReceiveProps(nextProps) {
        this.setState({...this.state, loggedInUser: nextProps["userInSession"]})
      }

    logoutUser = () => {
        this.service.logout()
        .then(() => {
            this.props.getTheUser(null)
            this.setState({
                redirect: true
            })  
        })
        .catch(err => console.log(err))
    }


    render() {

        const userInSession = this.props.userInSession

        if(this.state.redirect){
            return <Redirect to='/'></Redirect>
        }

        return (
            <>
            <Navbar userInSession={userInSession} />
            <div className='main-container-profile'>
                
                <p onClick={this.logoutUser} className='logout-link'>Logout</p>
                <div className='first-container-profile'>
                    
                 
                    <img src={userInSession.profileImage === '' ? DefaultAvatar : userInSession.profileImage} alt='user'></img>
                    <p>Profile name: {userInSession.profileName}</p>
                    <p>Match preference: {userInSession.matchPreference}</p>
                    <p>Prefered contact method: {userInSession.contactInfo}</p>
                    <Button>Edit profile</Button>
                    <Button type='secundary'>Delete profile</Button>
                
                
                </div>
                <div className='second-container-profile'>
                    {/* <BookshelfDisplay bookshelfId={userInSession.bookShelf} /> */}
                   
                </div>
            </div>
            </>
                
        )
    }
}
