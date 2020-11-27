import React from "react"
import "./Main.css"
import AuthService from "../../services/auth/auth-services"
import LogoDarkBackground from '../../assets/logo/Logo_dark_background.png'
import TurnedCorner from "../stylingelements/turnedcorner/TurnedCorner"



export default function Main() {
    return (
        <div className='main-container'>
            <div className='first-container'>
                <img src={LogoDarkBackground} alt='Logo readr' />
                <TurnedCorner />
            </div>
            <div className='second-container'>
                <h1>Book <br/>Your Next  <br/> Date</h1>
                <button><a href='/signup'>Sign up</a></button>
            </div>
        </div>
    )
}


