import React, { Component } from 'react'
import Navbar from '../../elements/navbar/Navbar'
import './SwipeBookshelfs.css'
import BookService from '../../../services/auth/bookshelf-services'
import BookshelfDisplay from '../../elements/bookshelf/Bookshelf'
import Loader from '../../elements/loader/Loader'

import IconLike from '../../../assets/icons/heart_like.png'
import IconDislike from '../../../assets/icons/cross_dislike.png'
import MatchGif from '../../../assets/match-gifs/match3-light-blue-color-gif'


export default class SwipeBookshelfs extends Component {

    state = {
        randomBookshelfId:'',
        loader: true,
        liked: '',
        disliked: '',
        errorMessage:'',
        newMatch: false
    }

    bookService = new BookService()

    componentDidMount() {
        this.getRandomBookshelf()
    }

    componentDidUpdate() {
        console.log('component-did-update');
    }

    //load random bookshelfs ready for swipe//
    getRandomBookshelf = () => {
        this.bookService.getRandomBookshelf()
            .then(response => {
                response ? this.setState({randomBookshelfId: response._id, loader: false}) : this.setState({ errorMessage: 'Sorry, This Is All For Now.', loader: false, randomBookshelfId: ''})
            })
            .catch(err => {
                console.log('error in get random bookshelf', err)
            })
    }

    saveLikeOrDislike = (disliked, liked) => {
        const matchesBeforeUpdate = this.props.userInSession.matches

        if(liked){
            this.bookService.updateLikes(liked) 
            .then(res => {
                !matchesBeforeUpdate.length <= res.matches.length && this.setState({ newMatch: true})
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

    timerMatchScreen = () => {
        setTimeout(
            () => this.setState({ newMatch: false}),
            3000
        )
    }


    render() {

        if(this.state.loader){
            return <Loader/>
        }

        if(this.state.newMatch){
            return(
                <div className='its-a-match'>                 
                        <img src={MatchGif} alt='match gif' />
                        <h1>It's A Match</h1>
                        {this.timerMatchScreen()}
                </div>
            )
        }

        if(this.state.errorMessage){
            return(
                <div >
                     <Navbar userInSession={this.props.userInSession} getTheUser={this.props.getTheUser}/>
                     <div className='main-container-swipe'>
                        <h2>{this.state.errorMessage}</h2>
                     </div>
                </div>
            )
        }

        return (
            <div >
                <Navbar userInSession={this.props.userInSession} getTheUser={this.props.getTheUser}/>
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
