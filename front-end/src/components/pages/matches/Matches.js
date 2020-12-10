import React, { Component } from 'react'
import Navbar from '../../elements/navbar/Navbar'

export default class Matches extends Component {
    render() {
        return (
            <div>
                <Navbar userInSession={this.props.userInSession} />
            </div>
        )
    }
}
