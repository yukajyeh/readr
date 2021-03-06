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
        .get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${searchInput}&printType=books&projection=lite&maxResults=12&key=${apiKey}`)
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
        let { name, value } = e.target;
        const bookTitle = book.volumeInfo.title;
        const bookAuthors = book.volumeInfo.authors;
        
        let bookCover;
        book.volumeInfo.imageLinks ? bookCover = book.volumeInfo.imageLinks.thumbnail : bookCover = DefaultBookCover;
        
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
        this.bookService.createShelf(
            this.state.selectedBooks.favBook,
            this.state.selectedBooks.childBook,
            this.state.selectedBooks.weaponBook,
            this.state.selectedBooks.pleasureBook,
            this.state.selectedBooks.showoffBook,
            this.state.selectedBooks.nextBook,
        )
        .then(response => {
            this.props.getTheUser(response)
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
                return <h1>What Is Your All Time Favorite Book?</h1>
            case 2:
                return <h1>What Is Your Childhood Favorite Book?</h1>
            case 3:
                return <h1>What Book Would You Use As Your Go-To Weapon? </h1>
            case 4:
                return <h1>Which Book Is Your Guilty Pleasure Book?</h1>  
            case 5:
                return <h1>Which Book Do You Name Drop To Be Cool?</h1> 
            case 6:
                return <h1>What Is Your Next Read?</h1>
            default:
            return 
    }}
    
    render() {
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
                    <div className='search-container'>
                        <h1>Hello <span>{this.props.userInSession && this.props.userInSession.profileName}</span> ! <br></br>
                        Let's Start Making Your Bookshelf</h1>
                        <h3> <i>Smart is the New Sexy</i> and <i>Sapiosexual</i>, Am I right?</h3>
                        <Button onClick={() => this.stepHandler('next')} type='primaryWhite'>Start</Button>
                    </div>
                </div>
            )
        } 

        if(currentStep > 0 && currentStep < 7) {
            return (
                <div className='startup-flow'>
                     <div className='search-container'>
                        <h5>Step {currentStep}</h5>
                        <progress id="file" value={currentStep} max="7"> </progress>
                        <div className='search-title'>
                            {this.displayTitle()}
                            <SearchBar
                                searchQuery={this.state.searchQuery}
                                updateSearchQuery={this.searchHandler}
                            />
                        </div>
                        <div className='input-container'>
                            <form >
                                {this.state.searchResults.map((book, index) => {
                                    return (
                                        <div className='search-result' key={index}>
                                                    <h3 className='book-title'>{book.volumeInfo.title}</h3> 
                                                    <p><i>{book.volumeInfo.authors}</i></p> 
                                                    {book.volumeInfo.imageLinks ? <img src={book.volumeInfo.imageLinks.thumbnail} alt='book cover' /> : <img src={DefaultBookCover} alt='default bookcover'/>}
                                                    <input type='radio' value={book.id} name={currentBookStep} onChange={(e) => this.onChangeHandler(e, book)} />
                                        </div>
                                    )
                                })}
                            </form>
                        </div>
                        <span>{this.state.errorMessage}</span> 
                        <div className='step-buttons'>
                            {currentStep > 0 && <Button type="secondaryWhite" onClick={this.stepHandler}>Previous</Button>}
                            {currentStep < 6 && <Button type="defaultWhite" onClick={() => this.stepHandler('next')} disabled={proceedNextStep}>Next</Button>}
                            {currentStep === 6 && <Button type="defaultWhite" onClick={this.saveBooks}>Confirm</Button>}
                        </div>
                    </div>
                </div>
        )} 

        if(currentStep === 7){
            return(
                <div className='startup-flow-end'>
                            <h1>Your Bookshelf!</h1>
                            <div className='bookshelf-card'>
                                <BookshelfDisplay bookshelfId={this.state.bookshelfId} /> 
                            </div>
                            <Button onClick={() =>this.stepHandler('next')} type='primary'>Meet Your Fellow Nerds</Button>
                </div>
            )
        }

    }
}
