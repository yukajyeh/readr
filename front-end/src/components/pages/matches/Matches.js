import React, { Component } from 'react'
import Navbar from '../../elements/navbar/Navbar'
import BookService from '../../../services/auth/bookshelf-services'
import Bookshelf from '../../elements/bookshelf/Bookshelf'
import UserService from '../../../services/auth/user-services'

export default class Matches extends Component {

    state= {
        matches: [],
        matchedBookshelfs: [],
        matchedShelfOwners:[]
    }

    bookService = new BookService()
    UserService = new UserService()

    componentDidMount(){
        this.getMatches()
    }

    componentDidUpdate() {
        console.log('component-match-did-update');
    }

    matchedBookshelfnOwner = () => {
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

        matchesIdsArray.forEach(bookshelfId => {
            this.UserService.showUser(bookshelfId)
            .then(response => {
                this.setState({
                    matchedShelfOwners: [...this.state.matchedShelfOwners, response]
                })
            })
            .catch(err => {
                console.log('error getting matched-owners', err)
            })
        })

    }  



    getMatches = () => {
        this.bookService.getMatches()
        .then(response => {
            this.setState({
                matches: response.matches
            }, () => this.matchedBookshelfnOwner())
        })
        .catch(err => {
            console.log('error getting matched-bookshelfId', err)
        })
    }



    render() {
        const bookshelfsArray = this.state.matchedBookshelfs
        console.log(this.state.matchedShelfOwners)

        return (
            <div className='container-matches'>
                <Navbar userInSession={this.props.userInSession} />
            <div className='matches'>
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
