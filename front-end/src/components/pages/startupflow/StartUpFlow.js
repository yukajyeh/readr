import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Axios from 'axios'

import SearchBar from '../../elements/searchbar/SearchBar'
import Button from '../../elements/button/Button';
import DefaultBookCover from '../../../assets/defbookcover.jpg' 
import BookService from '../../../services/auth/bookshelf-services'
import BookshelfDisplay from '../../elements/bookshelf/Bookshelf'
import './startupflow.css'


export default class StartUpFlow extends Component { 
    
    state = {
        searchQuery: '',
        currentStep: 0,
        searchResults: [],
        selectedBooks:{
            favBook: {},
            childBook: {},
            weaponBook: {},
            pleasureBook: {},
            showoffBook: {},
            nextBook: {}},
        bookshelfId: '',
        errorMessage: '',
        redirect: false,
    }

    bookService = new BookService()

    searchBook = (searchInput) => {
        const apiKey = process.env.REACT_APP_GOOGLE_BOOKS_API

        Axios
        .get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${searchInput}&printType=books&projection=lite&maxResults=5&key=${apiKey}`)
        .then(response => {

            if(response.data.items === undefined){
                return
            } 
            
            else {
                this.setState({
                    searchResults: response.data.items
                })
            }
            
        })
        .catch(err => console.error(err))
    }

    searchHandler = (searchValue) => {
        this.setState({
            searchQuery: searchValue
        }, this.searchBook(searchValue));
    }

    onChangeHandler = (e, book) => { 
        let { name, value } = e.target
        const bookTitle = book.volumeInfo.title
        const bookAuthors = book.volumeInfo.authors
        
        let bookCover
        book.volumeInfo.imageLinks ? bookCover = book.volumeInfo.imageLinks.thumbnail : bookCover = DefaultBookCover
        
        this.setState(prevState => ({
            ...prevState,
            selectedBooks: {
                ...prevState.selectedBooks,
                [name]: {
                    id: value,
                    title: bookTitle,
                    author: bookAuthors,
                    cover: bookCover,
                }
            }
          }))
    }

    stepHandler = (value) => {
        if(value === 'next'){
            this.setState ({
                currentStep:  this.state.currentStep+1
            }) 
        } else {
            this.setState({
                currentStep: this.state.currentStep-1
            })
        }
    
        if (this.state.currentStep === 7) {
            this.setState({
                redirect:true
            })
        }

        // clear search input and results array
        this.setState({
            searchQuery: '',
            searchResults: []
        })
    }

    saveBooks = () => {
        console.log('saveBooks is called')
        this.bookService.createShelf(
            this.state.selectedBooks.favBook,
            this.state.selectedBooks.childBook,
            this.state.selectedBooks.weaponBook,
            this.state.selectedBooks.pleasureBook,
            this.state.selectedBooks.showoffBook,
            this.state.selectedBooks.nextBook
        )
        .then(response => {
            console.log(response)
            this.setState({
                bookshelfId: response.bookShelf,
                currentStep: this.state.currentStep+1,
            })
        })
        .catch(err => {
            console.log(err)
        }) 
        

    }

    displayTitle = () => {
        switch (this.state.currentStep) {
            case 1: 
                return <h2>What Is Your All Time Favorite Book?</h2>
            case 2:
                return <h2>What Is Your Childhood Favorite Book?</h2>
            case 3:
                return <h2>What Book Would You Use As Your Go-To Weapon? </h2>
            case 4:
                return <h2>Which Book Is Your Guilty Pleasure Book?</h2>  
            case 5:
                return <h2>Which Book Do You Name Drop To Be Cool?</h2> 
            case 6:
                return <h2>What Is Your Next Read?</h2>
            default:
            return 
    }}
    
    render() {
        //console.log(this.state.bookshelfId)

        const selectedBooksArr = Object.keys(this.state.selectedBooks)
        const currentStep = this.state.currentStep
        const bookStep = currentStep-1
        const currentBookStep = selectedBooksArr[bookStep];
        const proceedNextStep = !!currentBookStep && Object.values(this.state.selectedBooks[currentBookStep]).length <= 0;


        if(this.state.redirect){
            return <Redirect to='/find-my-match'/>
        }

        
        
        
        if (currentStep === 0){
            return(
                <div className='startup-flow'>
                    <h1>Hello {this.props.userInSession && this.props.userInSession.profileName}!
                    Let's Start Making Your Bookshelf</h1>
                    <Button onClick={() => this.stepHandler('next')} >Start</Button>
                </div>
            )
        } 

        if(currentStep > 0 && currentStep < 7) {
            return (
                <div className='startup-flow'>

                     <div className='search-container'>
                        {this.displayTitle()}
                        <p> Search by book title</p>
                        <SearchBar
                            searchQuery={this.state.searchQuery}
                            updateSearchQuery={this.searchHandler}
                        />
                        <div className='input-container'>
                            {this.state.searchResults.map((book, index) => {
                                return (
                                    <div className='search-result' key={index}>
                                        <form onChange={(e) => this.onChangeHandler(e, book)}>
                                            <div className='bookresult' >
                                                <h3>{book.volumeInfo.title}</h3> 
                                                <h3>{book.volumeInfo.authors}</h3> 
                                                {book.volumeInfo.imageLinks ? <img src={book.volumeInfo.imageLinks.thumbnail} alt='book cover' /> : <img src={DefaultBookCover} alt='default bookcover'/>}
                                                <input type='radio' value={book.id} name={currentBookStep} />
                                            </div>
                                        </form>
                                    </div>
                                )
                            })}
                        </div>
                            <span>{this.state.errorMessage}</span> 
                            <div className='step-buttons'>
                                {currentStep > 0 && <Button type="primary" onClick={this.stepHandler}>Previous</Button>}
                                {currentStep < 6 && <Button onClick={() => this.stepHandler('next')} disabled={proceedNextStep}>Next</Button>}
                                {/* {currentStep < 6 && <Button onClick={() => this.stepHandler('next')} >Next</Button>} */}
                                {currentStep === 6 && <Button onClick={this.saveBooks}>Confirm</Button>}
                            </div>
                    </div>
                </div>
        )} 

        if(currentStep === 7){
            return(
                <div className='startup-flow'>
                    <h2>Your Bookshelf!</h2>
                    <BookshelfDisplay bookshelfId={this.state.bookshelfId} /> 
                    <Button onClick={() =>this.stepHandler('next')}>Meet Your Fellow Nerds</Button>
                </div>
            )
        }

    }
}
