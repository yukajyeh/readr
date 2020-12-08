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
        console.log('createShelf is called in services file')
        return this.service.post('/book/pick-my-books', { favBook, childBook, weaponBook, pleasureBook, showoffBook, nextBook })
        .then(res => {
            console.log('shelf created', res)
            return res.data
        })
    }

    showShelf = (bookshelfId) => {
        console.log(bookshelfId)
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

    updateLikesOrDislikes = (disliked, liked) => {
        return this.service.post('/book/likes-dislikes', { disliked, liked })
        .then(res => {
            return res.data
        })
        .catch(err => console.log(err))
    }
}

export default BookShelf