import React from 'react'
import './TurnedCorner.css'

const TurnedCorner = ({ position }) => {
    const classTypes = {
        home: 'home'
    }

    const classnames = `tc tc--${classTypes[position]}`;
    
    return (
        <div className={classnames}></div>
    )



}

export default TurnedCorner;