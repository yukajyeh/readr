import React from 'react'
import "./error-page.css"
import Warning from '../../assets/warning.png'

export default function ErrorPage() {
    return (
        <div>
            <div className='main-content'>
                <img src={Warning} id='Warning' alt='warning-icon'/>
                <h2>Oops! Page Not Found</h2>
            </div>
        </div>
    )
}
