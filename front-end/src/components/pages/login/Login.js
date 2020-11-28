
import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import AuthService from '../../../services/auth/auth-services'
import Button from '../../elements/button/Button'
import './Login.css'

export default class Login extends Component {

    state = {
        username: '',
        password: '',
        errorMessage: '',
        redirect: false
    }

    service = new AuthService()

    onChangeHandler = (e) => {
        const { name, value } = e.target

        this.setState({
            [name]: value
        })
    }

    submitHandler = (e) => {
        e.preventDefault()

        this.service.login(this.state.username, this.state.password)
        .then(user => {
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

        if(this.state.redirect) {
            return <Redirect to='/find-my-match'></Redirect>
        }

        return (

        
            <div className='login-page'>
                <div className='login-container'>
                    <h1>Log in</h1>
                <div className='login-form'>
                    <form onSubmit={this.submitHandler}>
                        <label>Username</label>
                        <input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.onChangeHandler}></input>
                        <label>Password</label>
                        <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.onChangeHandler}></input>
                        <Button id='one-button-on-page'>Log in</Button>
                    </form> 
                </div>
                    <span>{this.state.errorMessage}</span>
                    <p>No account yet? <Link to="/signup">Sign up</Link></p>
                </div>
            </div>
        )
    }
}
