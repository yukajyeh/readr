import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import AuthService from "../../../services/auth/auth-services"
import FileUpload from "../../../services/auth/file-upload"
import Button from '../../elements/button/Button'

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
        redirect: false,
    }

    fileUpload = new FileUpload()
    authService = new AuthService()

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value,
        })
    }

    handleFileUpload = e => {
        //console.log("The file to be uploaded is: ", e.target.files[0]);
 
        const uploadData = new FormData();
        uploadData.append("profileImage", e.target.files[0]);

        this.fileUpload.handleUpload(uploadData)
        .then(response => {
            this.setState({ profileImage: response.path });
          })
          .catch(err => {
            console.log("Error while uploading the file: ", err);
          });
    }

    handleFormSubmit = (e) => {
        e.preventDefault()

        this.authService.signup(
            this.state.username, 
            this.state.password, 
            this.state.profileName, 
            this.state.gender, 
            this.state.matchPreference,
            this.state.contactInfo,
            this.state.profileImage
             )

        .then(user => {
            console.log(user)
            this.props.getTheUser(user)
            this.setState({
                redirect:true
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
            <div className='sign-up-page'>
                <div className='outercontainer'>
                        <h1>Sign up</h1>
                    <div className='sign-up-form'>
                        <form onSubmit={this.handleFormSubmit}>
                            <label htmlFor ='profileImage'>Profile Photo</label>
                            <input type='file' name='profileImage' onChange={this.handleFileUpload} /> 

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

                            <Button id='signup'>Create my account</Button>
                        </form>
                        <span>{this.state.errorMessage}</span> 
                    </div>
                </div>
            </div>
        )
    }
}