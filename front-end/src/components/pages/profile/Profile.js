import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import './Profile.css'

import Button from '../../elements/button/Button';
import DefaultAvatar from '../../../assets/default_avatar.jpg'
import BookshelfDisplay from '../../elements/bookshelf/Bookshelf'

import AuthService from '../../../services/auth/auth-services';
import UserService from '../../../services/auth/user-services'
import Navbar from '../../elements/navbar/Navbar';


export default class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loggedInUser: null,
            targetOwner:'',
            redirect: false
        }
    }

    service = new AuthService()
    userService = new UserService()


    componentDidMount(){
        if(this.props.userInSession){
            this.setState({
                loggedInUser: this.props.userInSession
            })
        } 
        this.checkOwnerProfile()
    }

    checkOwnerProfile = () => {
        if(this.props.location.state.id){
            this.userService.grabOwner(this.props.location.state.id)
            .then((response) =>{
               this.setState({
                    targetOwner: response
                }) 
            })
            .catch(err => console.log(err))
        }
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
        
        console.log(this.props)

        if(this.state.redirect){
            return <Redirect to='/'></Redirect>
        }

        if(this.props.location.state.id){
            return (
                <div>
                        <Navbar userInSession={this.state.loggedInUser} />
                        <div className='main-container-profile'>
                        
                        <div className='first-container-profile'>
                            
                            <p>Profile name: {this.state.targetOwner.profileName}</p>
                            <p>Match preference: {this.state.targetOwner.matchPreference}</p>
                            <p>Prefered contact method: {this.state.targetOwner.contactInfo}</p>
                        </div>
                        
                        <div className='second-container-profile'>
                            <BookshelfDisplay bookshelfId={this.state.targetOwner.bookShelf} />
                        
                        </div>
                    </div>
                </div>
                    
            )
        } 
        
        if(this.state.loggedInUser){
            
            return (
                <div>
                <Navbar userInSession={this.state.loggedInUser} />
                <div className='main-container-profile'>
                    
                    <p onClick={this.logoutUser} className='logout-link'>Logout</p>
                        <div className='first-container-profile'>
                            <img src={this.state.loggedInUser.profileImage === '' ? DefaultAvatar : this.state.loggedInUser.profileImage} alt='user'></img>
                            <p>Profile name: {this.state.loggedInUser.profileName}</p>
                            <p>Match preference: {this.state.loggedInUser.matchPreference}</p>
                            <p>Prefered contact method: {this.state.loggedInUser.contactInfo}</p>
                            <Button>Edit profile</Button>
                            <Button type='secondary'>Delete profile</Button>
                        </div>
                        <div className='second-container-profile'>
                            <BookshelfDisplay bookshelfId={this.state.loggedInUser.bookShelf} />
                        </div>
                </div>
            </div>
            )
        } 
        
    }
}
