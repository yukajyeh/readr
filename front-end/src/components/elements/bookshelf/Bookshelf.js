import React, { Component } from 'react'
import './Bookshelf.css'
import BookService from '../../../services/auth/bookshelf-services'

export default class Bookshelf extends Component {

    state = {
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
                return <h3>All-time Favourite</h3>
            case 1:
                return <h3>Childhood Favorite</h3>
            case 2:
                return <h3>Go-To Weapon</h3>
            case 3:
                return <h3>Guilty Pleasure</h3>  
            case 4:
                return <h3>Name-Drop Book</h3> 
            case 5:
                return <h3>Next Read</h3>
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
            <div className='container'>
                {/* <h2>Bookshelf</h2> */}
                <div className='bookshelf'>

                    {booksArr.map((book, index) => {
                        return (
                            <div className='book' key={index}>
                                {this.displayTitle(index)}
                                <div className='img-wrap'>
                                    <img src={book.cover} alt='book cover'/>
                                    <p className='img-description'>{book.title}</p>
                                </div>
                            </div>
                        )
                    })}
            
                </div>
            </div>
        )
    }
}

   