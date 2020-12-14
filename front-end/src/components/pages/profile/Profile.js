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
            loggedInUser: '',
            targetOwner:'',
            redirect: false
        }
    }

    service = new AuthService()
    userService = new UserService()


    componentDidMount(){
        this.setState({
            loggedInUser: this.props.userInSession
        }, () => this.checkOwnerProfile(this.props.location.state && this.props.location.state.id))
    }

    checkOwnerProfile = (targetsId) => {
        if(targetsId){
            this.userService.grabOwner(targetsId)
            .then((response) =>{
               this.setState({
                    targetOwner: response
                }) 
            })
            .catch(err => console.log(err))
        }
    }

 
    render() {
 
        
        if(this.state.targetOwner){
            return (
                <div>
                    <Navbar userInSession={this.state.loggedInUser} getTheUser={this.props.getTheUser}/>
                    <div className='main-container-profile'>
                         <div className='first-container-profile'>
                            <img src={!this.state.targetOwner.profileImage ? DefaultAvatar : this.state.targetOwner.profileImage} alt='crush'></img>
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
        } else {
            return (
                <div>
                     <Navbar userInSession={this.state.loggedInUser} getTheUser={this.props.getTheUser} />
                     <div className='main-container-profile'>
                        <div className='first-container-profile'>
                            <img src={!this.state.loggedInUser.profileImage ? DefaultAvatar : this.state.loggedInUser.profileImage} alt='crush'></img>
                            <p>Profile name: {this.state.loggedInUser.username}</p>
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
