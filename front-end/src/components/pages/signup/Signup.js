import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import AuthService from "../../../services/auth/auth-services"
import FileUpload from "../../../services/auth/file-upload-services"
import Button from '../../elements/button/Button'

import'./Signup.css'


export default class Signup extends Component {

    constructor(props) {
        super(props)
        this.state = {
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
    }

    fileUpload = new FileUpload()
    authService = new AuthService()

    componentDidMount(){
        this.setState({
            username: '', 
            password: '', 
            profileName: '', 
            profileImage: '', 
            gender: '', 
            matchPreference: '', 
            contactInfo: '',
            errorMessage:'',
            redirect: false,
        })
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value,
        })
    }

    handleFileUpload = (e) => {
        const uploadData = new FormData();
        uploadData.append('profileImage', e.target.files[0])

        this.fileUpload.handleUpload(uploadData)
        .then(response => {
            this.setState({ profileImage: response });
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
            console.log('user in signup function handleFormSubmit', user)
            this.props.getTheUser(user)
            this.componentWillUnmount()
        })
        .catch(err => {
            this.setState({
                errorMessage: err.response.data.message
            })
        })
    }

    componentWillUnmount(){
        this.setState({
            redirect:true
        })
    }


    render() {

        if(this.state.redirect){
            return <Redirect to='/pick-my-books'></Redirect>
        }

        return (
            <div className='sign-up-page'>
                <Link className='closing-link closing-signup' to='/'>x</Link>
                <div className='outercontainer'>
                    <h1>Sign up</h1>
                    <div className='sign-up-form'>
                        <form onSubmit={this.handleFormSubmit}>
                            
                            <label>Username</label>
                            <input  className='sign-up-form-input' type="text" name="username" value={this.state.username} onChange={this.handleChange} required/>

                            <label>Password</label>
                            <input className='sign-up-form-input' type="password" name="password" value={this.state.password} onChange={this.handleChange} required/>

                            <label>Profile Name</label>
                            <input className='sign-up-form-input' type="test" name="profileName" value={this.state.profileName} onChange={this.handleChange} required/>
                            
                            <label htmlFor ='profileImage'>Profile Photo</label>
                            <input className='custom-file-input' type='file' name='profileImage' onChange={this.handleFileUpload} /> 
            
                            <label>Gender</label> 
                            <div className='custom-select'>
                                <select name="gender" value={this.state.gender} onChange={this.handleChange} required>
                                    <option value="">--Select Your Gender--</option>  
                                    <option value="female">Female</option>
                                    <option value="male">Male</option>
                                    <option value="unicorn">Unicorn</option>
                                </select>
                            </div>
                            

                            <label>I want to match with</label>
                            <div className='custom-select'>
                                <select name="matchPreference" value={this.state.matchPreference} onChange={this.handleChange} required>
                                    <option value="">--Select Match Preference--</option>
                                    <option value="female">Female</option>
                                    <option value="male">Male</option>
                                    <option value="unicorn">Unicorn</option>
                                    <option value="all">Everyone</option>
                                </select>
                            </div>
                           
                            <label htmlFor ='contactInfo'>Preferred Contact Method</label>  
                            <details id='signup-details'><summary>Details</summary>You can leave your <b>Instagram handle</b>, <b>Email address</b>, <b>Phone number</b> ..., whichever method you prefer your match to reach out to you!</details>
                            <input className='sign-up-form-input' type='text' name='contactInfo' onChange={this.handleChange} required/> 

                         
                            
                            <Button type='primary'>Create my account</Button>
                        </form>
                        <span>{this.state.errorMessage}</span> 
                    </div>
                </div>
            </div>
        )
    }
}