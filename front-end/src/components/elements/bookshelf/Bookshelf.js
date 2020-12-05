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
        const bookshelfId = this.props.bookshelfId

        this.bookService.showShelf(bookshelfId)
        .then(bookshelf => {
            console.log('response', bookshelf)
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



    render() {
        console.log(this.state)
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
                <ul>
                    <h3>Favourite Book</h3>
                    <h3>{this.state.favBook.title}</h3>
                    <li><img src={this.state.favBook.cover} alt='book cover'/></li>
                </ul>

                <ul>
                    <h3>Favourite Childhood Book</h3>
                    <li>{this.state.childBook.title}</li>
                    <li><img src={this.state.childBook.cover} alt='book cover'/></li>
                </ul>

                <ul>
                    <h3>Go-To Weapon Book</h3>
                    <li>{this.state.weaponBook.title}</li>
                    <li><img src={this.state.weaponBook.cover} alt='book cover'/></li>
                </ul>

                <ul>
                    <h3>Guilty Pleasure Book</h3>
                    <li>{this.state.pleasureBook.title}</li>
                    <li><img src={this.state.pleasureBook.cover} alt='book cover'/></li>
                </ul>

                <ul>
                    <h3>Name-Drop Pleasure Book</h3>
                    <li>{this.state.showoffBook.title}</li>
                    <li><img src={this.state.showoffBook.cover} alt='book cover'/></li>
                </ul>

                <ul>
                    <h3>Next Read</h3>
                    <li>{this.state.nextRead.title}</li>
                    <li><img src={this.state.nextRead.cover} alt='book cover'/></li>
                </ul>  

                <span>{this.state.errorMessage}</span> 
            </div>
        )
    }
}

   {/* {booksArr.map (book => {
                return(
                        {displayBookTitle = () => {
                                switch (book) {
                                    case favBook: 
                                        return <h2>Your Favorite Book</h2>
                                    case childBook:
                                        return <h2>Your Childhood Favorite Book</h2>
                                    case weaponBook:
                                        return <h2>Your Go-To Weapon Book </h2>
                                    case pleasureBook:
                                        return <h2> Your Guilty Pleasure Book</h2>  
                                    case showoffBook:
                                        return <h2>Your Name-Drop To Be Cool Book</h2> 
                                    case nextBook:
                                        return <h2>Your Next Read</h2>
                                    default:
                                    return 
                            }}}
                    
                    <ul key={book._id}>
                        <h3>Your Favourite Book</h3>
                        <h3>{this.state.favBook.title}</h3>
                        <li><img src={this.state.favBook.cover} alt='book cover'/></li>
                    </ul>
                )
            })} */}