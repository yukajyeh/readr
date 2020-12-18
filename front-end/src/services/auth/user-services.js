import axios from 'axios'

class UserService {
    constructor(){
        let service = axios.create({
            baseURL: process.env.REACT_APP_BASE_URL,
            withCredentials: true
        })
        this.service = service
    }


    grabOwner = (userId) => {
        return this.service.get('/user/user-info/'+ userId)
        .then(res => {
            return res.data
        })
        .catch(err => console.log(err))
    }

    showUser = (bookshelfId) => {
        return this.service.get('/user/owner/'+ bookshelfId)
        .then(res => {
            return res.data
        })
        .catch(err => console.log(err))
    }

  
 
    
}


export default UserService