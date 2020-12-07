import React, { Component } from 'react'
import Navbar from '../../elements/navbar/Navbar'

export default class SwipeBookshelfs extends Component {
    render() {
        return (
            <div>
                <Navbar userInSession={this.props.userInSession} />
                hello good bye
                
            </div>
        )
    }
}
