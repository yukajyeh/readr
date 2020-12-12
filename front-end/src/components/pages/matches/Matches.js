import React, { Component } from 'react'
import Navbar from '../../elements/navbar/Navbar'
import BookService from '../../../services/auth/bookshelf-services'
import Bookshelf from '../../elements/bookshelf/Bookshelf'

export default class Matches extends Component {

    state= {
        matches: [],
        matchedBookshelfs: [],
    }

    bookService = new BookService()

    componentDidMount(){
        this.getMatches()
    }

    componentDidUpdate() {
        console.log('component-match-did-update');
    }


    matchedBookshelf = () => {

        const matchesIdsArray = this.state.matches

        matchesIdsArray.forEach(bookshelfId => {
            this.bookService.showShelf(bookshelfId)
            .then(response => {
                this.setState({
                    matchedBookshelfs: [...this.state.matchedBookshelfs, response]
                })
            })
            .catch(err => {
                console.log('error getting matched-shelfs', err)
            })
        })
    }  

    getMatches = () => {
        this.bookService.getMatches()
        .then(response => {
            this.setState({
                matches: response.matches
            }, () => this.matchedBookshelf())
        })
        .catch(err => {
            console.log('error getting matched-bookshelfId', err)
        })
    }



    render() {
        const bookshelfsArray = this.state.matchedBookshelfs
        console.log(bookshelfsArray)

        return (
            <div>
                <Navbar userInSession={this.props.userInSession} />
                <div>
                    {bookshelfsArray.map((bookshelf,index) => {
                        return(
                            <div key={index}>
                                <Bookshelf bookshelfId={bookshelf._id}/>
            
                            </div>
                        )
                    })} 
                </div>
   
            </div>
        )
    }
}
