import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import SearchBar from '../../searchbar/SearchBar'
import './startupflow.css'
import DefaultBookCover from '../../../assets/defbookcover.jpg'
import Axios from 'axios'


export default class StartUpFlow extends Component { 
    
    state = {
        currentStep: 0,
        searchResults: [],
        favBook: '',
        childBook: '',
        weaponBook: '',
        pleasureBook: '',
        showoffBook: '',
        nextBook: '',
        redirect: false
    }

    nextStepHandler = () => {
        this.setState ({
           currentStep:  this.state.currentStep+1
        }) 
        
        if (this.state.currentStep === 7) {
            this.setState({
                redirect:true
            })
        }
    }

    // submitHandler () => {

    // }

    searchBook = (searchInput) => {
        let searchTerm = searchInput.search
        const apiKey = process.env.REACT_APP_GOOGLE_BOOKS_API

        Axios
        .get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${searchTerm}&printType=books&projection=lite&maxResults=5&key=${apiKey}`)
        .then(response => {
            this.setState({
                searchResults: response.data.items
            })
        })
        .catch(err => console.log(err))

    }

    displayTitle = () => {
        switch (this.state.currentStep) {
            default:
               return 
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
    }}

    
    render() {
        if(this.state.redirect){
            return <Redirect to='/find-my-match'/>
        }

        if(this.state.currentStep === 7){
            return (
                    <div className='startup-flow'>
                        <h2>Your Bookshelf Is Created!</h2>
                        <button onClick={this.nextStepHandler}>Meet Your Fellow Nerd</button>
                    </div>
                    )

        } else if (this.state.currentStep === 0){
            return(
                <div className='startup-flow'>
                    <h1>Let's Start Making Your Bookshelf</h1>
                    <button onClick={this.nextStepHandler}>Start</button>
                </div>
            )
        } 
        else {
            return (
                <div className='startup-flow'>
                {this.displayTitle()}
                    <p> Search by book title</p>
                    <SearchBar searchTerm={this.searchBook}/>
                    <div>
                        {this.state.searchResults.map(book => {
                                return (
                                    <div key={book.id}>
                                <h3>{book.volumeInfo.title}</h3> 
                                <h3>{book.volumeInfo.authors}</h3> 
                                {book.volumeInfo.imageLinks ? <img src={book.volumeInfo.imageLinks.thumbnail} alt='book cover' /> : <img src={DefaultBookCover} alt='default bookcover'/>}
                            </div>
                                )
                        })}
                        {this.state.currentStep > 0 && <button>Previous</button>}
                        <button onClick={this.nextStepHandler}>Next</button>
                    </div>
                </div>
    )} 
                    }
    
}