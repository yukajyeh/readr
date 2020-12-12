import axios from 'axios'

class BookShelf {
    constructor(){
        let service = axios.create({
            baseURL: process.env.REACT_APP_BASE_URL,
            withCredentials: true
        })
        this.service = service
    }

    createShelf = (favBook, childBook, weaponBook, pleasureBook, showoffBook, nextBook) => {
        return this.service.post('/book/pick-my-books', { favBook, childBook, weaponBook, pleasureBook, showoffBook, nextBook })
        .then(res => {
            return res.data
        })
    }

    showShelf = (bookshelfId) => {
        return this.service.get('/book/bookshelf/' + bookshelfId)
        .then(res => {
            return res.data
        })
        .catch(err => console.log(err))
    }

    getRandomBookshelf = () => {
        return this.service.get('/book/random-bookshelf')
        .then(res => {
            return res.data
        })
        .catch(err => console.log(err))
    }

    updateLikes = (liked) => {
        console.log('liked is called services', liked)
        return this.service.post('/book/update-likes',  {liked})
        .then(res => {
            return res.data
        })
        .catch(err => console.log(err))
    }

    updateDislikes = (disliked) => {
        console.log('disliked is called services', disliked)
        return this.service.post('/book/update-dislikes', {disliked})
        .then(res => {
            return res.data
        })
        .catch(err => console.log(err))
    }

    getMatches = () => {
        console.log('matches in services called')
        return this.service.get('/book/matches')
        .then(res => {
            return res.data
        })
        .catch(err => console.log(err))
    }
}

export default BookShelf