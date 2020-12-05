import React, { Component } from 'react'
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

    saveLikeOrDislike = () => {
        this.bookService.updateLikesOrDislikes(this.state.liked,this.state.disliked)
            .then(res => this.getRandomBookshelf())
            .catch(err => console.log(err))
    }

    likeOrdislike = (likeOrdislike) => {
        console.log('likeordislike');
        this.setState({
            [likeOrdislike]: this.state.randomBookshelfId
        }, this.saveLikeOrDislike())   
    }

    render() {
        // !this.state.showNewBookshelf && this.getRandomBookshelf();

        console.log(
            '%c RANDOMBOOKSHELFID ',
            'color: white; background-color: green; border-radius: 3px', this.state.randomBookshelfId
        )
        
        if(!this.state.randomBookshelfId){
            return <h1>loading</h1>
        }

        return (
            <div>
                <p>{this.state.randomBookshelfId}</p>
                <BookshelfDisplay bookshelfId={this.state.randomBookshelfId} />
                <button onClick={ () => this.likeOrdislike('disliked') }>Dislike</button>
                <button onClick={ () => this.likeOrdislike('liked') }>Like</button>
            </div>
        )
    }
    
}
