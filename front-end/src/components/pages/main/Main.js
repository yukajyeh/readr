import React from "react"
import "./Main.css"
import AuthService from "../../../services/auth/auth-services"
import LogoDarkBackground from '../../../assets/logo/Logo_dark_background.png'
import TurnedCorner from "../../elements/turnedcorner/TurnedCorner"
import Button from "../../elements/button/Button"



export default function Main() {
    return (
        <div className='main-container'>
            <div className='first-container'>
                <img src={LogoDarkBackground} alt='Logo readr' />
                <TurnedCorner />
            </div>
            <div className='second-container'>
                <h1>Book <br/>Your Next  <br/> Date</h1>
                <Button><a href='/signup'>Sign up</a></Button>
            </div>
        </div>
    )
}


