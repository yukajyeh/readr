import axios from 'axios'

class BookShelf {
    constructor(){
        let service = axios.create({
            baseURL: process.env.REACT_APP_BASE_URL,
            withCredentials: true
        })
        this.service = service
    }

    createShelf = (favBook, childBook, weaponBook, pleasureBook, showoffBook, nextBook, userId) => {
        return this.service.post('/book/pick-my-books', { favBook, childBook, weaponBook, pleasureBook, showoffBook, nextBook, userId })
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
        return this.service.post('/book/update-likes',  {liked})
        .then(res => {
            return res.data
        })
        .catch(err => console.log(err))
    }

    updateDislikes = (disliked) => {
        return this.service.post('/book/update-dislikes', {disliked})
        .then(res => {
            return res.data
        })
        .catch(err => console.log(err))
    }

    getMatches = () => {
        return this.service.get('/book/matches')
        .then(res => {
            return res.data
        })
        .catch(err => console.log(err))
    }

    getMatchInfo = (bookshelfId) => {
        return this.service.get('/book/info/' + bookshelfId)
        .then(res => {
            return res.data
        })
        .catch(err => console.log(err))
    }
}

export default BookShelf