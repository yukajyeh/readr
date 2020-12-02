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
        return this.service.post('/api/pick-my-books', { favBook, childBook, weaponBook, pleasureBook, showoffBook, nextBook })
        .then(res => {
            console.log(res.data)
            return res.data
        })
    }

    showShelf = (bookshelfId) => {
        return this.service.get('/api/pick-my-books', bookshelfId)
        .then(res => {
            console.log(res.data)
            return res.data
        })

        
    }
}

export default BookShelf