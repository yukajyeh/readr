import React, { Component } from 'react'
import Navbar from '../../elements/navbar/Navbar'
import './SwipeBookshelfs.css'
import BookService from '../../../services/auth/bookshelf-services'
import BookshelfDisplay from '../../elements/bookshelf/Bookshelf'


export default class SwipeBookshelfs extends Component {

    state = {
        randomBookshelfId:'',
        liked: '',
        disliked: ''
    }

    bookService = new BookService()

    componentDidMount() {
        this.getRandomBookshelf();
    }

    componentDidUpdate() {
        console.log('componentdid-update');
    }

    //load random bookshelfs ready for swipe//
    getRandomBookshelf = () => {
        this.bookService.getRandomBookshelf()
            .then(response => {
                this.setState({
                    randomBookshelfId: response._id,
                })
            })
            .catch(err => console.log(err))
    }

    saveLikeOrDislike = (disliked, liked) => {
        this.bookService.updateLikesOrDislikes(disliked, liked)
            .then(res => this.getRandomBookshelf())
            .catch(err => console.log(err))
    }

    likeOrdislike = (likeOrDislike) => {
        this.setState({
            [likeOrDislike]: this.state.randomBookshelfId
        }, () => {this.saveLikeOrDislike(this.state.disliked, this.state.liked)})  
    }

    render() {
        
        if(!this.state.randomBookshelfId){
            return <h1>loading</h1>
        }

        return (
            <div>
                <Navbar userInSession={this.props.userInSession} />
                <p>{this.state.randomBookshelfId}</p>
                <BookshelfDisplay bookshelfId={this.state.randomBookshelfId} />
                <button onClick={ () => this.likeOrdislike('disliked') }>Dislike</button>
                <button onClick={ () => this.likeOrdislike('liked') }>Like</button>
            </div>
        )
    }
    
}
