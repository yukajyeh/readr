import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Navbar from '../../elements/navbar/Navbar'
import BookService from '../../../services/auth/bookshelf-services'
import Bookshelf from '../../elements/bookshelf/Bookshelf'
import UserService from '../../../services/auth/user-services'
import DefaultAvatar from '../../../assets/default_avatar.jpg'

import './Matches.css'

export default class Matches extends Component {

    state= {
        matches: [],
        combinedInfo:[],
        ownerId:'',
        redirect: false,
        loggedInUser: '',
        nomatch: true
    }

    bookService = new BookService()
    userService = new UserService()

    componentDidMount() {
        this.setState({
            loggedInUser: this.props.userInSession
        }, () => this.getMatches())
    }

    componentDidUpdate() {
        console.log('component-match-did-update');
    }

    matchedBookshelfnOwner = () => {
        const matchesIdsArray = this.state.matches

        matchesIdsArray.forEach(bookshelfId => {
            this.bookService.getMatchInfo(bookshelfId)
            .then(response => {
                this.setState({
                    combinedInfo: [...this.state.combinedInfo,response]
                 })
            })
            .catch(err => {
                console.log(err)
            })
        })
    } 

    getMatches = () => {
        this.bookService.getMatches()
        .then(response => {
            this.setState({
                matches: response.matches
            }, () => this.matchedBookshelfnOwner())
        })
        .then(response =>{
            if(this.state.matches.length > 0){
                this.setState({
                    nomatch: false
                })
            }
        }
        )
        .catch(err => {
            console.log('error getting matched-bookshelfId', err)
        })
    }

    displayCrush = (ownerId) => {
        this.setState({
            redirect: true,
            ownerId: ownerId
        })
    }



    render() {
    
        if(this.state.redirect){
            return <Redirect to={{pathname: '/profile', state: { id: this.state.ownerId}}}/>
        }

        if(this.state.nomatch){
            return(   
            <div>
                <Navbar userInSession={this.state.loggedInUser} getTheUser={this.props.getTheUser}/>
                <div className='main-container-swipe'>
                    <h2>Patience, Come Check Later</h2>
                </div>
            </div>
            )
        }

        const combinedInfo = this.state.combinedInfo

        return (

            <div className='container-matches'>
                <Navbar userInSession={this.state.loggedInUser} getTheUser={this.props.getTheUser}/>
            
                <div className='matches'>
                    <div className='bookshelf-display'>
                        {combinedInfo.map((combination,index) => {
                           console.log(combination)
                            return (
                                
                                <div key={index} className='crush-card' onClick = {() => this.displayCrush(combination.owner._id)}>
                                    <div className='owner-info'>
                                        <img src={!combination.owner.profileImage ? DefaultAvatar : combination.owner.profileImage } alt='your-crush'/>
                                        <div>
                                            <p>Bookshelf</p>
                                            <h2>{combination.owner.profileName}</h2>
                                        </div>
                                    </div>
                                    <hr></hr>
                                    <Bookshelf bookshelfId={combination._id}/>
                                </div>
                            )
                        })} 
                    </div>
                </div>
            </div>
        )
    }
}
