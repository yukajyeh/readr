import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Axios from 'axios'
import './Bookshelf.css'

export default class Bookshelf extends Component {


    getBook = () => {
        const shelf = this.props.selectedBooks
        const BookArr = Object.entries(shelf)
        const apiKey = process.env.REACT_APP_GOOGLE_BOOKS_API

        //console.log(BookArr)

        for (const [question, title_id] of BookArr){
            Axios
            .get(`https://www.googleapis.com/books/v1/volumes/${title_id}?projection=lite&key=${apiKey}`)
            .then(response => {
                console.log(response.data)
               /*  /* this.setState({
                    [question]: {
                        title: response.data
                    } 
                }) */
        })
             .catch(err => console.error(err))
        }

        
    }

    render() {
        this.getBook()
       
        return (
            <div>
              
            </div>
        )
    }
}
