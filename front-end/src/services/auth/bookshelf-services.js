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
        console.log(bookshelfId)
        return this.service.get('/book/bookshelf/' + bookshelfId)
        .then(res => {
            return res.data
        })
        .catch(err => console.log(err))
   
    }
}

export default BookShelf