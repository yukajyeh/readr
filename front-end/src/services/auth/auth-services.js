import axios from 'axios'

/* -- add Image upload funtion-- */

class AuthService {
    constructor(){
        let service = axios.create({
            baseURL: process.env.REACT_APP_BASEURL,
            withCredentials: true
        })
        this.service = service
    }


    signup = (username, password, profileName, profileImage, gender, matchPreference, contactInfo) => {
        return this.service.post('/auth/signup', { username, password, profileName, profileImage, gender, matchPreference, contactInfo} )
        .then(response => {
            console.log(response.data)
            return response.data
        })
    }

    login = (username, password) => {
        return this.service.post('/auth/login', { username, password })
        .then(response => response.data)
    }

    logout = () => {
        return this.service.get('auth/logout')
        .then(response => response.data)
    }

    loggedin = () => {
        return this.service.get('auth/loggedin')
        .then(response => response.data)
    }

    // imageUpload = (image) => {
    //     return this.service.post('auth/profile', image)
    //     .then(response => response.data)
    // }


}


export default AuthService