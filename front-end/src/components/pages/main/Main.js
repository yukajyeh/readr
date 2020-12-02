import React from "react"
import { Element } from "react-scroll"
import "./Main.css"
import AuthService from "../../../services/auth/auth-services"
import LogoDarkBackground from '../../../assets/logo/Logo_dark_background.png'
import TurnedCorner from "../../elements/turnedcorner/TurnedCorner"
import Button from "../../elements/button/Button"




export default function Main() {
    return (
        <div>
            <div className='main-container'>
                <div className='first-container'>
                    <img src={LogoDarkBackground} alt='Logo readr' />
                    <TurnedCorner position='home'/>
                </div>
                <div className='second-container'>
                    <h1>Book<br/>Your Next<br/>Date</h1>
                    <Button><a href='/signup'>Sign up</a></Button>
                </div>
            </div>
            <Element id='about-info' name='about-info'>
                <article className='about-section'>
                    <h2>About</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent non vestibulum neque. Praesent sit amet egestas eros. Morbi tempor ac eros vitae tincidunt. Nulla tincidunt malesuada tincidunt. Suspendisse placerat maximus arcu a scelerisque.  </p>
                    <p>Mauris mauris enim, pharetra nec lacinia sed, vehicula at enim. Nunc pulvinar tristique nisi, non feugiat neque blandit et. Nullam tincidunt dignissim diam, eu fringilla arcu rutrum ut. Nulla euismod sollicitudin sagittis. Proin egestas sapien id enim dictum feugiat. Aenean porttitor ornare purus, nec convallis massa ultrices a. Nam turpis libero, pharetra eget mi a, congue consectetur metus.</p>
                </article>
            </Element>
        </div>
    )
}


