import React, { Component } from 'react'
import Navbar from '../../elements/navbar/Navbar'
import './SwipeBookshelfs.css'
import BookService from '../../../services/auth/bookshelf-services'
import BookshelfDisplay from '../../elements/bookshelf/Bookshelf'
import Loader from '../../elements/loader/Loader'

import IconLike from '../../../assets/icons/heart_like.png'
import IconDislike from '../../../assets/icons/cross_dislike.png'


export default class SwipeBookshelfs extends Component {

    state = {
        randomBookshelfId:'',
        loader: true,
        liked: '',
        disliked: '',
        errorMessage:'',
        loggedInUser: ''
    }

    bookService = new BookService()

    componentDidMount() {
        this.setState({
            loggedInUser: this.props.userInSession
        }, () => this.getRandomBookshelf())
    }

    componentDidUpdate() {
        console.log('componentdid-update');
    }

    //load random bookshelfs ready for swipe//
    getRandomBookshelf = () => {
        this.bookService.getRandomBookshelf()
            .then(response => {
                response ? this.setState({randomBookshelfId: response._id, loader: false}) : this.setState({ errorMessage: 'Sorry, This Is All.', loader: false, randomBookshelfId: ''})
            })
            .catch(err => {
                console.log('error in get random bookshelf', err)
            })
    }

    saveLikeOrDislike = (disliked, liked) => {
        if(liked){
            this.bookService.updateLikes(liked) 
            .then(res => {
                
                this.setState({liked: '' })
                this.getRandomBookshelf()
            })
            .catch(err => {
                console.log('error in saveLike', err)
            })
        } 
        
        if(disliked) {
            this.bookService.updateDislikes(disliked)
            .then(res => {
                this.setState({disliked: ''})
                this.getRandomBookshelf()
            })
            .catch(err => {
                console.log('error in saveDislike', err)
            })
        }
    }

    likeOrdislike = (likeOrDislike) => {
        this.setState({
            [likeOrDislike]: this.state.randomBookshelfId
        }, () => {this.saveLikeOrDislike(this.state.disliked, this.state.liked)})  
    }


    render() {
        if(this.state.loader){
            return <Loader/>
        }

        if(this.state.errorMessage){
            return(
                <div >
                     <Navbar userInSession={this.state.loggedInUser} getTheUser={this.props.getTheUser}/>
                     <div className='main-container-swipe'>
                        <span>{this.state.errorMessage}</span>
                     </div>
                </div>
            )
        }

        return (
            <div >
                <Navbar userInSession={this.state.loggedInUser} getTheUser={this.props.getTheUser}/>
                <div className='main-container-swipe'>
                    <div className='swipe-shelf'>
                    <BookshelfDisplay bookshelfId={this.state.randomBookshelfId} />
                    </div>
                    <div className='buttons'>
                        <div className='likey-dislikey'>
                        <img onClick={ () => this.likeOrdislike('disliked') } style={{height: '30px'}} src={IconDislike} alt='dislike icon' />
                        </div>
                        <div className='likey-dislikey'>
                        <img onClick={ () => this.likeOrdislike('liked') } style={{height: '30px'}} src={IconLike} alt='like icon'/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
}
