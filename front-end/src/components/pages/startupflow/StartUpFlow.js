import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Axios from 'axios'

import SearchBar from '../../elements/searchbar/SearchBar'
import Button from '../../elements/button/Button';
import DefaultBookCover from '../../../assets/defbookcover.jpg'
import './startupflow.css'


export default class StartUpFlow extends Component { 
    
    state = {
        searchQuery: '',
        currentStep: 0,
        searchResults: [],
        selectedBooks:{
            favBook: '',
            childBook: '',
            weaponBook: '',
            pleasureBook: '',
            showoffBook: '',
            nextBook: ''},
        redirect: false
    }

    nextStepHandler = (value) => {
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

    onChangeHandler = (e) => { 
        let { name, value } = e.target

        this.setState(prevState => ({
            ...prevState,
            selectedBooks: {
             ...prevState.selectedBooks,
             [name]: value
            }
          }))
    }

    searchBook = (searchInput) => {
        const apiKey = process.env.REACT_APP_GOOGLE_BOOKS_API

        Axios
        .get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${searchInput}&printType=books&projection=lite&maxResults=5&key=${apiKey}`)
        .then(response => {
            this.setState({
                searchResults: response.data.items
            })
        })
        .catch(err => console.error(err))
    }

    searchHandler = (searchValue) => {
        this.setState({
            searchQuery: searchValue
        });
        this.searchBook(searchValue);
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
        const selectedBooksArr = Object.keys(this.state.selectedBooks)
        const currentStep = this.state.currentStep
        const bookStep = currentStep-1
        const currentBookStep = selectedBooksArr[bookStep]

        console.log(this.props)
    
        if(this.state.redirect){
            return <Redirect to='/find-my-match'/>
        }

        if(currentStep === 7){
            return (
                <div className='startup-flow'>
                    <h2>Your Bookshelf Is Created!</h2>
                    <Button onClick={this.nextStepHandler}>Meet Your Fellow Nerd</Button>
                </div>
            )
        } 
        
        if (currentStep === 0){
            return(
                <div className='startup-flow'>
                    <h1>Hello {this.props.userInSession && this.props.userInSession.profileName}! Let's Start Making Your Bookshelf</h1>
                    <Button onClick={() => this.nextStepHandler('next')}>Start</Button>
                </div>
            )
        } 

        if(currentStep > 0 && currentStep < 7) {
            return (
                <div className='startup-flow'>
                    {this.displayTitle()}
                    <p> Search by book title</p>
                    <SearchBar
                        searchQuery={this.state.searchQuery}
                        updateSearchQuery={this.searchHandler}
                    />
                     <div>
                        <form onChange={this.onChangeHandler}>
                            {this.state.searchResults.map(book => {
                                return (
                                    <div key={book.id}>
                                        <h3>{book.volumeInfo.title}</h3> 
                                        <h3>{book.volumeInfo.authors}</h3> 
                                        {book.volumeInfo.imageLinks ? <img src={book.volumeInfo.imageLinks.thumbnail} alt='book cover' /> : <img src={DefaultBookCover} alt='default bookcover'/>}
                                        <input type='radio' value={book.id} name={currentBookStep} />
                                    </div>
                                )
                            })}
                        </form>
                        {currentStep > 0 && <Button type="primary" onClick={this.nextStepHandler}>Previous</Button>}
                        <Button onClick={() =>this.nextStepHandler('next')}>Next</Button>
                    </div>
                </div>
        )} 
    }
}
