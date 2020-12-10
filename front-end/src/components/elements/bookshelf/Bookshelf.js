import React, { Component } from 'react'
import './Bookshelf.css'
import BookService from '../../../services/auth/bookshelf-services'

export default class Bookshelf extends Component {

    state= {
        favBook: {},
        childBook: {},
        weaponBook: {},
        pleasureBook: {},
        showoffBook: {},
        nextRead: {}
    }

    bookService = new BookService()

    componentDidMount() {
        this.onRenderBookshelf();
    }

    componentDidUpdate(prevProps) {
        if (this.props.bookshelfId !== prevProps.bookshelfId) {
            this.onRenderBookshelf();
        }
    }

    onRenderBookshelf = () => {
        const bookshelfId = this.props.bookshelfId;

        this.bookService.showShelf(bookshelfId)
        .then(bookshelf => {
            this.setState({
                favBook: bookshelf.favBook,
                childBook: bookshelf.childBook,
                weaponBook: bookshelf.weaponBook,
                pleasureBook: bookshelf.pleasureBook,
                showoffBook: bookshelf.showoffBook,
                nextRead: bookshelf.nextBook,
            })
        })
        .catch(err => {
            console.log(err)
        }) 
    }

    displayTitle = (index) => {
        switch (index) {
            case 0: 
                return <h2>Favorite Book</h2>
            case 1:
                return <h2>Childhood Favorite Book</h2>
            case 2:
                return <h2>Go-To Weapon Book </h2>
            case 3:
                return <h2>Guilty Pleasure Book</h2>  
            case 4:
                return <h2>Name Drop Book</h2> 
            case 5:
                return <h2>Next Read</h2>
            default:
            return 
    }}


    render() {
        const booksArr = [
            this.state.favBook,
            this.state.childBook,
            this.state.weaponBook,
            this.state.pleasureBook,
            this.state.showoffBook,
            this.state.nextRead
        ]
        
        return (
            <div>
                {booksArr.map((book, index) => {
                    return (
                        <div key={index}>
                            {this.displayTitle(index)}
                            <h3>{book.title}</h3>
                            <img src={book.cover} alt='book cover'/>
                        </div>
                    )
                })}
            

                <span>{this.state.errorMessage}</span> 
            </div>
        )
    }
}

   