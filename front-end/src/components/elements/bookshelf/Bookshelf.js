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
        
        return (
            <div>
                <ul>
                    <h3>Your Favourite Book</h3>
                    <h3>{this.state.favBook.title}</h3>
                    <li><img src={this.state.favBook.cover} alt='book cover'/></li>
                </ul>

                <ul>
                    <h3>Your Favourite Childhood Book</h3>
                    <li>{this.state.childBook.title}</li>
                    <li><img src={this.state.childBook.cover} alt='book cover'/></li>
                </ul>

                <ul>
                    <h3>Your Go-To Weapon Book</h3>
                    <li>{this.state.weaponBook.title}</li>
                    <li><img src={this.state.weaponBook.cover} alt='book cover'/></li>
                </ul>

                <ul>
                    <h3>Your Guilty Pleasure Book</h3>
                    <li>{this.state.pleasureBook.title}</li>
                    <li><img src={this.state.pleasureBook.cover} alt='book cover'/></li>
                </ul>

                <ul>
                    <h3>Your Name-Drop Pleasure Book</h3>
                    <li>{this.state.showoffBook.title}</li>
                    <li><img src={this.state.showoffBook.cover} alt='book cover'/></li>
                </ul>

                <ul>
                    <h3>Your Next Read</h3>
                    <li>{this.state.nextRead.title}</li>
                    <li><img src={this.state.nextRead.cover} alt='book cover'/></li>
                </ul>

                <span>{this.state.errorMessage}</span> 
            </div>
        )
    }
}
