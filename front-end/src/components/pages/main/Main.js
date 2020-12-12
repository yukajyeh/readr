import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import "./Main.css"

import LogoDarkBackground from '../../../assets/logo/Logo_dark_background.png'
import TurnedCorner from "../../elements/turnedcorner/TurnedCorner"
import Button from "../../elements/button/Button"
import Navbar from '../../elements/navbar/Navbar'
import Tweet1 from '../../../assets/pictures/tweet_bill.png'
import Tweet2 from '../../../assets/pictures/tweet_bruce.png'
import Tweet3 from '../../../assets/pictures/tweet_michael.png'

export default class Main extends Component {

    state = {
        redirect: ''
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
                <Navbar userInSession={this.props.userInSession} />
                <header className='main-container' id='header-section'>
                    <div className='first-container'>
                        <img src={LogoDarkBackground} alt='Logo readr' />
                        
                    </div>
                    <div className='second-container'>
                        <h1>Book<br/>Your Next<br/>Date</h1>
                        {this.props.userInSession ? 
                            <Button onClick={() => this.redirect('/find-my-match')}>Start</Button> 
                            : <Button onClick={() => this.redirect('/signup')}>Sign up</Button>}
                            <TurnedCorner position='home'/>
                    </div>
                </header>
                <article className='about-section' id='about-section'>
                    <h2>About</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent non vestibulum neque. Praesent sit amet egestas eros. Morbi tempor ac eros vitae tincidunt. Nulla tincidunt malesuada tincidunt. Suspendisse placerat maximus arcu a scelerisque.  </p>
                    <p>Mauris mauris enim, pharetra nec lacinia sed, vehicula at enim. Nunc pulvinar tristique nisi, non feugiat neque blandit et. Nullam tincidunt dignissim diam, eu fringilla arcu rutrum ut. Nulla euismod sollicitudin sagittis. Proin egestas sapien id enim dictum feugiat. Aenean porttitor ornare purus, nec convallis massa ultrices a. Nam turpis libero, pharetra eget mi a, congue consectetur metus.</p>
                </article>

                <section className='review-section'>
                    <h2>Reviews</h2>
                    <img src={Tweet1} alt='tweet-1'/>
                    <img src={Tweet2} alt='tweet-2'/>
                    <img src={Tweet3} alt='tweet-3'/>
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



