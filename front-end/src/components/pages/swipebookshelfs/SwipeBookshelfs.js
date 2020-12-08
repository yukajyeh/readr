import React, { Component } from 'react'
import Navbar from '../../elements/navbar/Navbar'

import './SwipeBookshelfs.css'
import BookService from '../../../services/auth/bookshelf-services'
import BookshelfDisplay from '../../elements/bookshelf/Bookshelf'


export default class SwipeBookshelfs extends Component {

    state = {
        showNewBookshelf: false,
        randomBookshelfId:'',
        liked: '',
        disliked: ''
    }

    bookService = new BookService()

    componentDidMount() {
        this.getRandomBookshelf();
    }

    componentDidUpdate() {
        console.log('componentdidudate');
    }

    //load random bookshelfs ready for swipe//
    getRandomBookshelf = () => {
        console.log('calling random bookshelf')
        this.bookService.getRandomBookshelf()
            .then(response => {
                console.log('randombookshelf response id',response._id)
                this.setState({
                    randomBookshelfId: response._id,
                    // showNewBookshelf: true
                })
            })
            .catch(err => console.log(err))
    }

    saveLikeOrDislike = (disliked, liked) => {
        console.log('save like or dislike is called', disliked, liked)
        this.bookService.updateLikesOrDislikes(disliked, liked)
            .then(res => this.getRandomBookshelf())
            .catch(err => console.log(err))
    }

    likeOrdislike = (likeOrDislike) => {
        console.log('likeOrDislike is called');
        this.setState({
            [likeOrDislike]: this.state.randomBookshelfId
        }, () => {this.saveLikeOrDislike(this.state.disliked, this.state.liked)})  
    }

    render() {
        // !this.state.showNewBookshelf && this.getRandomBookshelf();

        console.log(
            '%c liked ',
            'color: white; background-color: green; border-radius: 3px', this.state.liked
        )

        console.log(
            '%c disliked ',
            'color: white; background-color: red; border-radius: 3px', this.state.disliked
        )
        
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
