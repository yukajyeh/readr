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
        nextRead: {},
        errorMessage: ''
    }

    bookService = new BookService()

    

    componentDidMount() {
        const bookshelfId = this.props.bookshelfId
      
        this.bookService.showShelf(bookshelfId)
        .then(bookshelf => {
            console.log('hello')
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
            this.setState({
                errorMessage: err.response.data.message
            })
        }) 
        
    }


    render() {
        console.log(this.state)
        return (
            <div>
                hello
              <span>{this.state.errorMessage}</span> 
            </div>
        )
    }
}
