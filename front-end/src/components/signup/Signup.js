import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import AuthService from "../../services/auth/auth-services"
import'./Signup.css'

export default class Signup extends Component {

    state = {
        username: '', 
        password: '', 
        profileName: '', 
        profileImage: '', 
        gender: '', 
        matchPreference: '', 
        contactInfo: '',
        errorMessage:'',
        redirect: false
    }

    service = new AuthService()

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value,
        })
    }

    handleFormSubmit = (e) => {
        e.preventDefault()

        this.service.signup(
            this.state.username, 
            this.state.password, 
            this.state.profileName, 
            this.state.profileImage, 
            this.state.gender, 
            this.state.matchPreference,
            this.state.contactInfo )

        .then(user => {
            console.log(user)
            this.props.getTheUser(user)
            this.setState({
                redirect: true
            })
        })

        .catch(err => {
            this.setState({
                errorMessage: err.response.data.message
            })
        })
    }

    render() {
        
        if(this.state.redirect){
            return <Redirect to='/pick-my-books'></Redirect>
        }

        return (
            <div>
                <div className='outercontainer'>
                        <h1>Sign up</h1>
                    <div className='sign-up-form'>
                        <form onSubmit={this.handleFormSubmit}>
                            <label htmlFor ='profileImage'>Profile Photo</label>
                            <input type='file' name='profileImage'/> 

                            <label>Username</label>
                            <input type="text" name="username" value={this.state.username} onChange={this.handleChange} required/>

                            <label>Password</label>
                            <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required/>

                            <label>Profile Name</label>
                            <input type="profileName" name="profileName" value={this.state.profileName} onChange={this.handleChange} required/>
                            
                            <label>Gender:   
                                <select name="gender" value={this.state.gender} onChange={this.handleChange} required>
                                    <option value="">--Select One--</option>  
                                    <option value="female">Female</option>
                                    <option value="male">Male</option>
                                    <option value="unicorn">Unicorn</option>
                                </select>
                            </label>

                            <label>I want to match with:   
                                <select name="matchPreference" value={this.state.matchPreference} onChange={this.handleChange} required>
                                    <option value="">--Select One--</option>
                                    <option value="female">Female</option>
                                    <option value="male">Male</option>
                                    <option value="unicorn">Unicorn</option>
                                    <option value="all">Everyone</option>
                                </select>
                            </label>

                            <label htmlFor ='contactInfo'>Preferred Contact Method</label>
                            <input type='text' name='contactInfo' onChange={this.handleChange} required/> 

                            <button id='signup'>Create my account</button>
                        </form>
                        <span>{this.state.errorMessage}</span> 
                    </div>
                </div>
            </div>
        )
    }
}