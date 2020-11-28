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

    // submitHandler () => {

    // }

    searchBook = (searchInput) => {
        let searchTerm = searchInput.search
        const apiKey = process.env.REACT_APP_GOOGLE_BOOKS_API

        Axios
        .get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${searchTerm}&printType=books&projection=lite&key=${apiKey}`)
        .then(response => {
            this.setState({
                searchResults: response.data.items
            })
        })
        .catch(err => console.log(err))

    }

    displayTitle = () => {
        if(this.state.currentStep == 0){
            return  <h2>What is your all time favorite book?</h2>
        } 
    }

    
    render() {
        console.log(this.state.searchResults)

        if(this.state.redirect){
            return <Redirect />
        }

        // if(this.state.searchResults.length > 1 ) {
        //     return <h1>Loading</h1>
        // }
        
        return (
            <div className='startup-flow'>
               {this.displayTitle()}
                <p> Search by book title</p>
                <SearchBar searchTerm={this.searchBook}/>
                <div>
                    {this.state.searchResults.map(book => {
                        {console.log(book)}
                            return (
                                <div key={book.id}>
                            <h3>{book.volumeInfo.title}</h3> 
                            <h3>{book.volumeInfo.authors}</h3> 
                            {book.volumeInfo.imageLinks ? <img src={book.volumeInfo.imageLinks.thumbnail} alt='book cover' /> : <img src={DefaultBookCover} alt='default bookcover'/>}
                            
                        </div>
                            )
                    })}
                </div>
            </div>

    )} 

    
}
