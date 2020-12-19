import React, { Component } from 'react'
import './Profile.css'

import Button from '../../elements/button/Button';
import DefaultAvatar from '../../../assets/default_avatar.jpg'
import BookshelfDisplay from '../../elements/bookshelf/Bookshelf'

import AuthService from '../../../services/auth/auth-services';
import UserService from '../../../services/auth/user-services'
import Navbar from '../../elements/navbar/Navbar';
import Loader from '../../elements/loader/Loader'


export default class Profile extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loggedInUser: '',
            targetOwner:'',
            userProfile: '',
            redirect: false,
            loader: true
        }
    }

    service = new AuthService()
    userService = new UserService()


    componentDidMount(){
        console.log('mount')
        this.setState({
            loggedInUser: this.props.userInSession
        }, () => this.checkOwnerProfile(this.props.location.state && this.props.location.state.id))
    }


    checkOwnerProfile = (targetsId) => {
        if(targetsId){
            this.userService.grabOwner(targetsId)
            .then((response) =>{
               this.setState({
                    targetOwner: response,
                    loader:false
                }) 
            })
            .catch(err => console.log(err))
        } else {
            this.setState({ 
                userProfile: this.props.userInSession,
                loader: false,
            })
        }
    }

    render() {

        if(this.state.loader){
            return <Loader/>
        }   
        
        if(this.state.targetOwner){
            return (
                <div>
                    <Navbar userInSession={this.state.loggedInUser} getTheUser={this.props.getTheUser}/>
                    <div className='main-container-profile'>
                         <div className='first-container-profile'>
                            <img src={!this.state.targetOwner.profileImage ? DefaultAvatar : this.state.targetOwner.profileImage} alt='crush'></img>
                            <table>
                                <tbody>       
                                <tr>
                                    <td><p>Profile Name:</p></td>
                                    <td><span>{this.state.loggedInUser.profileName}</span></td>
                                </tr>    
                                <tr>
                                    <td><p>Match Preference:</p></td>
                                    <td><span>{this.state.loggedInUser.profileName}</span></td>
                                </tr>
                                <tr>
                                    <td><p>Prefered Contact Method:</p></td>
                                    <td><span>{this.state.loggedInUser.contactInfo}</span></td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                        
                        <div className='second-container-profile'>
                            <div className='bookshelf'>
                                {this.state.loggedInUser && <BookshelfDisplay bookshelfId={this.state.targetOwner.bookShelf} />}
                            </div>
                        </div>
                    </div>
                </div>     
            )
        } else if(this.state.userProfile){ 
            return (
                <div>
                     <Navbar userInSession={this.state.loggedInUser} getTheUser={this.props.getTheUser} />
                     <div className='main-container-profile'>
                        <div className='first-container-profile'>
                            <img src={!this.state.loggedInUser.profileImage ? DefaultAvatar : this.state.loggedInUser.profileImage} alt='crush'></img>
                            <table>
                                <tbody>       
                                <tr>
                                    <td><p>Profile Name:</p></td>
                                    <td><span>{this.state.loggedInUser.profileName}</span></td>
                                </tr>    
                                <tr>
                                    <td><p>Match Preference:</p></td>
                                    <td><span>{this.state.loggedInUser.profileName}</span></td>
                                </tr>
                                <tr>
                                    <td><p>Prefered Contact Method:</p></td>
                                    <td><span>{this.state.loggedInUser.contactInfo}</span></td>
                                </tr>
                                </tbody>
                            </table>
                            <div className='profile-button'>
                                <Button>Edit Profile</Button>
                                <Button type='secondary'>Delete Profile</Button>
                            </div>
                        </div>
                        <div className='second-container-profile'>
                            <BookshelfDisplay bookshelfId={this.props.userInSession.bookShelf} />
                        </div>
                     </div>
                </div>
            )

        }
    }
}
