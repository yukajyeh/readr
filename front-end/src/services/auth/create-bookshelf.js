import axios from 'axios'
import React, { Component } from 'react'

class CreateShelf {
    
    constructor(){
        let service = axios.create({
            baseURL: process.env.REACT_APP_BASE_URL,
            withCredentials: true
        })
        this.service = service
    }

    createShelf = (favBook, childBook, weaponBook, pleasureBook, showoffBook, nextBook) => {
        return this.service.post('/api/picked-books', { favBook, childBook, weaponBook, pleasureBook, showoffBook, nextBook})
        .then(res => res.data)
        .catch((e) => {
            console.log(e)})
    }
    
}

export default CreateShelf
