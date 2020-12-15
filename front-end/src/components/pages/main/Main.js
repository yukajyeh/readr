import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import "./Main.css"

import LogoDarkBackground from '../../../assets/logo/Logo_dark_background.png'
import TurnedCorner from "../../elements/turnedcorner/TurnedCorner"
import Button from "../../elements/button/Button"
import Navbar from '../../elements/navbar/Navbar'
import Slider from '../../elements/slider/slider'


export default class Main extends Component {

    state = {
        redirect: '',
        loggedInUser: '',
    }

    componentDidMount(){
        this.setState({
            loggedInUser: this.props.userInSession
        })
    }

    componentWillReceiveProps(nextProps) {
        this.setState({...this.state, loggedInUser: nextProps["userInSession"]})
    }

    redirect = (targetPage) => {
        this.setState({
            redirect: targetPage
        })
    }

    render() {
   
        if(this.state.redirect){
            return <Redirect to={this.state.redirect} />
        }

        return (
            <div>
                <Navbar userInSession={this.state.loggedInUser} getTheUser={this.props.getTheUser}/>
                <header className='main-container' id='header-section'>
                    <div className='first-container'>
                        <img src={LogoDarkBackground} alt='Logo readr' />
                    </div>

                    <div className='second-container'>
                        <h1>Book</h1>
                        <h1>Your Next</h1>
                        <h1>Date</h1>
                        {this.props.userInSession ? 
                            <Button onClick={() => this.redirect('/find-my-match')}>Start</Button> 
                            : <Button onClick={() => this.redirect('/signup')}>Sign up</Button>}
                            <TurnedCorner position='home'/>
                    </div>
                </header>

                <article className='about-section' id='about-section'>
                    <h2>About</h2>
                    <p>Want to skip small talks when it comes to meeting new people? 
                    Can't find the ones who read the same type of books as you do? 
                    Prefer brain more than appearances? Do you identify as "Sapiosexual"?
                    <b>Say no more</b>.With <b>Readr</b> you can find your future partner, friends, spiritual animals & many more ...
                    based on their reading interests</p>
                </article>

                <section className='review-section'>
			        <h2> Reviews</h2>	
                    <Slider/>					
               </section>

                <footer className='footer'>
                    <div className='footer-left'>
                        <div>
                            <p>Get In Touch:</p>
                            <span className='mail'>m</span>
                        </div>
                        <p>© 2020 readr, All Rights Reserved</p>
                    </div>
                    <div className='footer-right'>
                        <p>Follow Us On: </p>
                        <span className='social-icons-font1'>I</span>
                        <span className='social-icons-font2'>F</span>
                        <span className='social-icons-font2'>L</span>
                    </div>
                </footer>
            </div>
       
        )
    }
}





